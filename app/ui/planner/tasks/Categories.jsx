import Link from "next/link";
import Category from "./Category";

export default function Categories({ categories }) {
  return (
    <>
      <Link href={"/planner/categories"}>
        <button>Config Categories</button>
      </Link>
      {categories.map((category, index) => {
        return <Category key={index} category={category} />;
      })}
    </>
  );
}
