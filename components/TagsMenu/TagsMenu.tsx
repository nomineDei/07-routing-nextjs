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
            <li key={tag} className={css.menuItem}>
              {tag === "All Notes" ? (
                <Link href="/notes/filter" onClick={() => setIsOpen(false)}>
                  {tag}
                </Link>
              ) : (
                <Link
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
