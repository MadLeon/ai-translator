"use client";

import { UpdateTask, DeleteTask } from "./buttons";
import { calculateWeekday } from "@/app/lib/utils";

export default function TaskRecord({ record, noCategory }) {
  return (
    <tr>
      <td>{`${record.due_date.getFullYear()}.${
        record.due_date.getMonth() + 1
      }.${record.due_date.getDate()}`}</td>
      <td>{calculateWeekday(record.due_date.getDay())}</td>

      {!noCategory && <td>{record.category}</td>}

      <td>{record.name}</td>
      <td>{record.description}</td>
      <td>
        <DeleteTask id={record.id} />
      </td>
      <td>
        <UpdateTask id={record.id} />
      </td>
    </tr>
  );
}
