import { client } from "./client";

export const loadProduct = async (slug) => {
  const product = await client.fetch(
    // We only want the first product that matches this query with the slug name
    `*[_type == "product" && slug.current == '${slug}'][0]`
  );

  return product;
};

export const loadProducts = async () => {
  const products = await client.fetch(`*[_type == "product"]`);

  return products;
};
