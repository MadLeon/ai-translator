import Category from "./Category";

export default function Categories({ categories }) {
  console.log(categories);
  return (
    <>
      {categories.map((category, index) => {
        return <Category key={index} category={category} />;
      })}
    </>
  );
}
