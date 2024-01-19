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

export async function fetchCategories() {
  try {
    const data = (await sql) < Revenue > `SELECT * FROM revenue`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
  // try {
  //   const categories = await sql`SELECT DISTINCT category FROM task;`;
  //   return categories;
  // } catch (error) {
  //   console.error("Database Error:", error);
  //   throw new Error("Failed to fetch the categories.");
  // }
}
