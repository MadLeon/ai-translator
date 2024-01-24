import TaskList from "../ui/planner/tasks/TaskList";
import Categories from "../ui/planner/tasks/Categories";
import { fetchCategories } from "../lib/sql";

export default async function Page() {
  const categories = await fetchCategories();
  return (
    <>
      <TaskList />
      <Categories categories={categories} />
    </>
  );
}
