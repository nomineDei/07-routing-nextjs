"use client";

import Link from "next/link";
import css from "./TagsMenu.module.css";
import { useState } from "react";

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const tags = [
    "All Notes",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
    "Todo",
  ] as const;

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li className={css.menuItem} key={tag}>
              {tag === "All Notes" ? (
                <Link
                  className={css.menuLink}
                  href="/notes/filter/All"
                  onClick={() => setIsOpen(false)}
                >
                  {tag}
                </Link>
              ) : (
                <Link
                  className={css.menuLink}
                  href={`/notes/filter/${tag}`}
                  onClick={() => setIsOpen(false)}
                >
                  {tag}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
