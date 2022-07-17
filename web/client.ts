import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "xf7c6zo0", // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: "v2021-10-21",
});
