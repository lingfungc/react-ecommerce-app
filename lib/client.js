import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Connect Sanity to Get Data
export const client = createClient({
  projectId: "a3rjn438",
  dataset: "production",
  apiVersion: "2023-05-05",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

// Use imageUrlBuilder() to get the image from Sanity
const builder = imageUrlBuilder(client);

// This urlFor() helps to build the image url
export const urlFor = (source) => builder.image(source);
