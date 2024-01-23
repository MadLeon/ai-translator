import TaskList from "../ui/planner/tasks/TaskList";
import Categories from "../ui/planner/tasks/Categories";
import { fetchCategoryNames } from "../lib/sql";

export default async function Page() {
  const categories = await fetchCategoryNames();
  return (
    <>
      <TaskList />
      <Categories categories={categories} />
    </>
  );
}
