"use server";

import { z } from "zod";
import { nanoid } from "nanoid";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const TaskFormSchema = z.object({
  id: z.string,
  category: z.string(),
  name: z.string(),
  description: z.string(),
  dueDate: z.string(),
  status: z.boolean(),
});

const CategoryFormSchema = z.object({
  name: z.string(),
  abbreviation: z.string(),
  section: z.string(),
  remark: z.string(),
});

const CreateTask = TaskFormSchema.omit({ id: true, status: true });
const CreateCategory = CategoryFormSchema.omit({ id: true });

/**
 *
 * @param {FormData} formData Data of the new task
 */
export async function createTask(formData) {
  const { category, name, description, dueDate } = CreateTask.parse({
    category: formData.get("category"),
    name: formData.get("name"),
    description: formData.get("description"),
    dueDate: formData.get("dueDate"),
  });
  const id = nanoid();
  const status = true;

  await sql`
  INSERT INTO tasks (id, name, category, description, due_date, status)
  VALUES (${id}, ${name}, ${category}, ${description}, ${dueDate}, ${status})
  `;
  revalidatePath("/planner");
  redirect("/planner");
}

/**
 *
 * @param {FormData} formData Updated task information
 */
export async function updateTask(formData) {
  const { category, name, description, dueDate } = CreateTask.parse({
    category: formData.get("category"),
    name: formData.get("name"),
    description: formData.get("description"),
    dueDate: formData.get("dueDate").split("T")[0],
  });
  const id = formData.get("id");
  const status = true;

  await sql`
  UPDATE tasks
  SET "name" = ${name}, category = ${category}, description = ${description}, due_date = ${dueDate}, status = ${status}
  WHERE id = ${id};
  `;
  revalidatePath("/planner");
  redirect("/planner");
}

/**
 *
 * @param {FormData} formData Finished task
 */
export async function deleteTask(formData) {
  const id = formData.get("id");
  console.log(id);
  await sql`
  UPDATE tasks
  SET status = false
  WHERE id = ${id};
  `;
  revalidatePath("/planner");
}

/**
 *
 * @param {FormData} formData Data of the new category
 */
export async function createCategory(formData) {
  const { name, abbreviation, section, remark } = CreateCategory.parse({
    name: formData.get("name"),
    abbreviation: formData.get("abbreviation"),
    section: formData.get("section"),
    remark: formData.get("remark"),
  });
  const id = nanoid();

  await sql`
  INSERT INTO categories (id, name, abbreviation, section, remark)
  VALUES (${id}, ${name}, ${abbreviation}, ${section}, ${remark})
  `;
  revalidatePath("/planner");
  redirect("/planner");
}

export async function updateCategory(formData) {
  const { name, abbreviation, section, remark } = CreateCategory.parse({
    name: formData.get("name"),
    abbreviation: formData.get("abbreviation"),
    section: formData.get("section"),
    remark: formData.get("remark"),
  });
  const id = formData.get("id");

  await sql`
  UPDATE categories
  SET "name" = ${name}, abbreviation = ${abbreviation}, section = ${section}, remark = ${remark}
  WHERE id = ${id};
  `;
  revalidatePath("/planner/categories");
  redirect("/planner/categories");
}
