import Link from "next/link";

import { createTask } from "@/app/lib/action";

export default function Form({ categories }) {
  return (
    <form action={createTask}>
      {/* Category */}
      <label htmlFor="category">Category</label>
      <select name="category">
        {categories.map((category, index) => {
          return <option key={index}>{category}</option>;
        })}
      </select>

      {/* Title */}
      <label htmlFor="name">Task Name</label>
      <input type="text" name="name" />

      {/* Description */}
      <label htmlFor="description">Description</label>
      <textarea rows={5} name="description" />

      {/* Due Date */}
      <label htmlFor="dueDate">Due Date</label>
      <input type="date" name="dueDate" />

      {/* Submit/Cancel Buttons */}
      <button type="submit">Create Task</button>

      <Link href={"/planner"}>
        <button>Cancel</button>
      </Link>
    </form>
  );
}
