import Category from "./category";

export default function Categories({ categories }) {
  return <Category />;
  // return (
  //   <>
  //     {categories.map((element) => {
  //       return <Category key={element.id} data={element} />;
  //     })}
  //   </>
  // );
}
