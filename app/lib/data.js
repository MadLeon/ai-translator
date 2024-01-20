import { sql } from "@vercel/postgres";

export async function fetchRevenue() {
  try {
    const data = await sql`SELECT * FROM revenue`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
