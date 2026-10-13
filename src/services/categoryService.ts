"use server"


export async function getCategory() {
  const response = await fetch(
    `${process.env.NEXTURL_API}/categories`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result = await response.json();

  return result.data;
}
