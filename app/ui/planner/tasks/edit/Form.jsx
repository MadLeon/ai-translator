import Link from "next/link";

import { updateTask } from "@/app/lib/action";

export default function Form({ categories, task }) {
  return (
    <form action={updateTask}>
      <label htmlFor="id">ID</label>
      <input type="text" name="id" defaultValue={task.id} />

      {/* Category */}
      <label htmlFor="category">Category</label>
      <select name="category">
        {categories.map((category, index) => {
          return <option key={index}>{category}</option>;
        })}
      </select>

      {/* Title */}
      <label htmlFor="name">Task Name</label>
      <input type="text" name="name" defaultValue={task.name} />

      {/* Description */}
      <label htmlFor="description">Description</label>
      <textarea rows={5} name="description" defaultValue={task.description} />

      {/* Due Date */}
      <label htmlFor="dueDate">Due Date</label>
      <input
        type="date"
        name="dueDate"
        defaultValue={new Date(task.due_date).toISOString().split("T")[0]}
      />

      {/* Submit/Cancel Buttons */}
      <button type="submit">Update Task</button>
      <Link href={"/planner"}>
        <button>Cancel</button>
      </Link>
    </form>
  );
}
