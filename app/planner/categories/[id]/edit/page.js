import { fetchCategoryById } from "@/app/lib/sql";
import Form from "@/app/ui/planner/categories/edit/Form";

export default async function Page({ params }) {
  const category = await fetchCategoryById(params.id);

  return <Form category={category} />;
}
