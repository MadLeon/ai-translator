import TaskRecord from "./TaskRecord";
import { fetchRecord } from "@/app/lib/sql";

export default function Category({ category }) {
  console.log(category);
  return <p>{category}</p>;
}
