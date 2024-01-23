import Link from "next/link";

import { fetchAllTasks } from "@/app/lib/sql";
import TaskRecord from "./TaskRecord";

export default async function TaskList() {
  const tasks = await fetchAllTasks();

  return (
    <div>
      <span>
        <h3>Task List</h3>
        <Link href={"/planner/tasks/create"}>
          <button>New Task</button>
        </Link>
      </span>
      <table>
        <thead>
          <tr>
            <th>Due Date</th>
            <th>Weekday</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <TaskRecord key={index} record={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
