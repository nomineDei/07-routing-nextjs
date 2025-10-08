import { redirect } from "next/navigation";

const Redirect = () => {
  redirect("/notes/filter/All");
  return null;
};

export default Redirect;
