import css from "./SideBar.module.css";

import Link from "next/link";

const tags = [
  "All Notes",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
] as const;

const Sidebar = async () => {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li className={css.menuItem} key={tag}>
          {tag === "All Notes" ? (
            <Link className={css.menuLink} href="/notes/filter/All">
              {tag}
            </Link>
          ) : (
            <Link className={css.menuLink} href={`/notes/filter/${tag}`}>
              {tag}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
