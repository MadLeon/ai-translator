import { fetchTaskById, fetchCategoryNames } from "@/app/lib/sql";
import Form from "@/app/ui/planner/tasks/edit/Form";

export default async function Page({ params }) {
  const id = params.id;
  const [categories, task] = await Promise.all([
    fetchCategoryNames(),
    fetchTaskById(id),
  ]);

  return <Form categories={categories} task={task} />;
}
