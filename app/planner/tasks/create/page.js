import Form from "@/app/ui/planner/tasks/create/Form";

import { fetchCategories } from "@/app/lib/sql";

export default async function Page() {
  const categories = await fetchCategories();
  return (
    <>
      <Form categories={categories.map((category) => category.abbreviation)} />
    </>
  );
}
