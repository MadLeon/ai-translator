"use client";

import { fetchCategories } from "@/app/lib/sql";

export default function Category() {
  const handleTestClick = async () => {
    try {
      const revenue = await fetchCategories();
      console.log(revenue);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <>
      <button onClick={handleTestClick}>Test</button>
    </>
  );
}
