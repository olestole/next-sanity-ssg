import client from "../client";
import imageUrlBuilder from "@sanity/image-url";
import groq from "groq";
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import Layout from "../components/Layout";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

const urlFor = (source: string) => {
  return imageUrlBuilder(client).image(source);
};

const ptComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <Image
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value)
            .width(320)
            .height(240)
            .fit("max")
            .auto("format")
            .url()}
        />
      );
    },
  },
};

const Post = ({
  title = "Missing title",
  name = "Missing name",
  authorImage = "",
  body = [],
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <article>
        <h1>{title}</h1>
        <span>By {name}</span>
        {authorImage && (
          <div>
            <Image
              width={200}
              height={200}
              alt="Author image"
              src={urlFor(authorImage).width(200).url()}
            />
          </div>
        )}
        <PortableText value={body} components={ptComponents} />
      </article>
    </Layout>
  );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "authorImage": author->image,
  body
}`;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { title, name, authorImage, body } = await client.fetch(query, {
    slug: context?.params?.slug ?? "",
  });
  return {
    props: {
      title,
      name,
      authorImage,
      body,
    },
  };
};

export default Post;
