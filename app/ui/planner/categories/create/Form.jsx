import Link from "next/link";

import { createCategory } from "@/app/lib/action";

export default function Form() {
  return (
    <form action={createCategory}>
      {/* Name */}
      <label htmlFor="name">Category Name</label>
      <input type="text" name="name" />

      {/* Abbreviation */}
      <label htmlFor="abbreviation">Abbreviation</label>
      <input type="text" name="abbreviation" />

      {/* Section */}
      <label htmlFor="section">Section</label>
      <input type="text" name="section" />

      {/* Remark */}
      <label htmlFor="remark">Remark</label>
      <input type="text" name="remark" />

      {/* Submit/Cancel Buttons */}
      <button type="submit">Create Category</button>

      <Link href={"/planner"}>
        <button>Cancel</button>
      </Link>
    </form>
  );
}
