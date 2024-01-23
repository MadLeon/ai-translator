import CategoryRow from "./CategoryRow";

export default function CategoryTable({ categories }) {
  return (
    <table>
      <thead>
        <tr>
          <td>Abbreviation</td>
          <td>Name</td>
          <td>Section</td>
          <td>Remark</td>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, index) => {
          return <CategoryRow category={category} key={index} />;
        })}
      </tbody>
    </table>
  );
}
