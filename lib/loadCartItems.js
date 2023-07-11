// * It seems that this loadCartItems is not able to get any data from frontend or browser
export const loadCartItems = async () => {
  if (typeof window !== "undefined") {
    const data = await JSON.parse(localStorage.getItem("cart"));

    // return ["a", "b", "c"];
    return data;
  }
  return [1, 2, 3];
};
