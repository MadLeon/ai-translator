import { deleteTask } from "@/app/lib/action";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function UpdateTask({ id }) {
  return (
    <Link
      href={`/planner/tasks/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <button>Edit</button>
      {/* <PencilIcon className="w-5" /> */}
    </Link>
  );
}

export function DeleteTask({ id }) {
  return (
    <form action={deleteTask}>
      <input type="text" name="id" defaultValue={id} hidden />
      <button type="submit">Finish</button>
    </form>
  );
}
