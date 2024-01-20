import Categories from "../ui/planner/Categories";
import { fetchCategories } from "../lib/sql";

export default async function Page() {
  const categories = await fetchCategories();
  return <Categories categories={categories} />;
}
