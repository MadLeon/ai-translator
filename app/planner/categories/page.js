import Link from "next/link";
import { fetchCategories } from "@/app/lib/sql";
import CategoryTable from "@/app/ui/planner/categories/CategoryTable";

export default async function Page() {
  const categories = await fetchCategories();
  return (
    <>
      <Link href={"/planner/categories/create"}>
        <button>Create Category</button>
      </Link>
      <CategoryTable categories={categories} />
      <Link href={"/planner"}>
        <button>Back</button>
      </Link>
    </>
  );
}
