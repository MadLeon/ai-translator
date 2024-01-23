import Link from "next/link";

export default function CategoryRow({ category }) {
  return (
    <tr>
      <td>{category.abbreviation}</td>
      <td>{category.name}</td>
      <td>{category.section}</td>
      <td>{category.remark}</td>
      <td>
        <Link href={`/planner/categories/${category.id}/edit`}>
          <button>Edit</button>
        </Link>
      </td>
      <td>
        <button>Delete</button>
      </td>
    </tr>
  );
}
