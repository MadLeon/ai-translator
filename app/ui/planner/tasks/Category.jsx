import TaskRecord from "./TaskRecord";
import { fetchTasksByCategory } from "@/app/lib/sql";

export default async function Category({ category }) {
  const records = await fetchTasksByCategory(category.abbreviation);
  return (
    records.length > 0 && (
      <div>
        <h4>{`${category.abbreviation} ${category.name}`}</h4>
        <table>
          <thead>
            <tr>
              <th>Due Date</th>
              <th>Weekday</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
            {records.map((record, index) => (
              <TaskRecord key={index} record={record} noCategory={true} />
            ))}
          </thead>
        </table>
      </div>
    )
  );
}
