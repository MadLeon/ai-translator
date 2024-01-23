import { sql } from "@vercel/postgres";

/**
 * @return {Array} Array of all names of categories
 */
export async function fetchCategoryNames() {
  try {
    const categories =
      await sql`SELECT DISTINCT category FROM tasks WHERE status = true`;
    return categories.rows.map((item) => {
      return item.category;
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the categories.");
  }
}

/**
 *
 * @returns {array} Array of all categories
 */
export async function fetchCategories() {
  try {
    const categories = await sql`SELECT * FROM categories ORDER BY remark`;
    return categories.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the categories.");
  }
}

export async function fetchCategoryById(id) {
  try {
    const category = await sql`SELECT * FROM categories WHERE id = ${id};`;
    console.log(category.rows);
    return category.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the categories.");
  }
}

/**
 * @param {string} category The name of a category
 * @return {array} Array of all records of the category
 */
export async function fetchTasksByCategory(category) {
  try {
    const records =
      await sql`SELECT * FROM tasks WHERE category = ${category} AND status = true ORDER BY due_date`;
    return records.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch the records from ${category}.`);
  }
}

/**
 *
 * @returns {array} Array of all tasks
 */
export async function fetchAllTasks() {
  try {
    const tasks =
      await sql`SELECT * FROM tasks WHERE status = true ORDER BY due_date`;
    return tasks.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch the records from ${category}.`);
  }
}

/**
 *
 * @param {id} id Task ID
 * @returns Task object with specific id
 */
export async function fetchTaskById(id) {
  try {
    const task = await sql`SELECT * FROM tasks WHERE id = ${id}`;
    console.log(task.rows[0]);
    return task.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch the task with id: ${id}.`);
  }
}
