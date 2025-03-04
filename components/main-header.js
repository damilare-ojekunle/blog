import Link from "next/link";
import NavLink from "./nav-link";

const menuLink = [
  {
    id: 1,
    name: "News",
    href: "/news",
  },
  {
    id: 2,
    name: "Archive",
    href: "/archive",
  },
];

export default function MainHeader() {
  return (
    <header id="main-header">
      <div id="logo">
        <Link href="/">NextNews</Link>
      </div>
      <nav>
        <ul>
          {menuLink.map(({ id, name, href }) => (
            <li key={id}>
              <NavLink href={href}>{name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
