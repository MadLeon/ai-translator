import { fetchTaskById, fetchCategories } from "@/app/lib/sql";
import Form from "@/app/ui/planner/tasks/edit/Form";

export default async function Page({ params }) {
  const id = params.id;
  const [categories, task] = await Promise.all([
    (async () => {
      const categories = await fetchCategories();
      return categories.map((category) => category.abbreviation);
    })(),
    fetchTaskById(id),
  ]);
  console.log(task);
  return <Form categories={categories} task={task} />;
}
