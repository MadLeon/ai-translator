import Link from "next/link";

import { updateCategory } from "@/app/lib/action";

export default function Form({ category }) {
  return (
    <form action={updateCategory}>
      <label htmlFor="id">ID</label>
      <input type="text" name="id" defaultValue={category.id} />

      {/* Name */}
      <label htmlFor="name">Category Name</label>
      <input type="text" name="name" defaultValue={category.name} />

      {/* Abbreviation */}
      <label htmlFor="abbreviation">Abbreviation</label>
      <input
        type="text"
        name="abbreviation"
        defaultValue={category.abbreviation}
      />

      {/* Section */}
      <label htmlFor="section">Section</label>
      <input type="text" name="section" defaultValue={category.section} />

      {/* Remark */}
      <label htmlFor="remark">Remark</label>
      <input type="text" name="remark" defaultValue={category.remark} />

      {/* Submit/Cancel Buttons */}
      <button type="submit">Update Category</button>
      <Link href={"/planner/categories"}>
        <button>Cancel</button>
      </Link>
    </form>
  );
}
