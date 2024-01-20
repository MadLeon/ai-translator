import { sql } from "@vercel/postgres";
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from "./definitions";

/**
 * @return {Array} Array of all names of categories
 */
export async function fetchCategories() {
  try {
    const categories = await sql`SELECT DISTINCT category FROM task;`;
    return categories.rows.map((item) => {
      return item.category;
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the categories.");
  }
}
