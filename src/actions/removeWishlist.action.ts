"use server";

import getUserToken from "@/Helper/getUserToken";

export async function removeFromWishlist(productId: string) {
  const token = await getUserToken();

  if (!token) {
    throw new Error("You are not authenticated");
  }

  const response = await fetch(`${process.env.NEXTURL_API}/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token:token+'',
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.errors?.msg ||
      data?.message ||
      "Failed to remove product from wishlist"
    );
  }

  return data;
}