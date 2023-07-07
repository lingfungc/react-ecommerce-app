// * This "/api" folder is actually the backend of the app in Next.js

import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    // console.log(req.body);
    // console.log(req.body[0].image[0]);

    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        allow_promotion_codes: true,
        billing_address_collection: "required",
        shipping_address_collection: {
          allowed_countries: ["GB", "HK", "JP", "US"], // Limit shipping addresses to specific countries if needed
        },
        phone_number_collection: {
          enabled: "true",
        },
        shipping_options: [
          { shipping_rate: "shr_1NRDSNAiibJjByt5LYclO2y9" },
          { shipping_rate: "shr_1NRDSpAiibJjByt5R8YVozuX" },
        ],
        // * This "line_items" should be all the products in the shopping cart
        line_items: req.body.map((item) => {
          // * This "img" now is only an object from Sanity, and we need to convert it to an url
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/a3rjn438/production/"
            )
            .replace("-webp", ".webp")
            .replace("-jpg", ".jpg")
            .replace("-jpeg", ".jpeg")
            .replace("-png", ".png");

          return {
            price_data: {
              currency: "gbp",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
      // res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
