import type { CardProps } from "./Card";
import { NavLink } from "react-router";

const LOGO = <h1>Streams</h1>;

interface NavbarProps {
  links: CardProps[];
}

export function Navbar({ links }: NavbarProps) {
  const navbarItems = links.map(({ name }, index) => {
    return (
      <NavLink className="navbar-item" key={name} to={`/streams/${name}`}>
        {name}
      </NavLink>
    );
  });

  return (
    <nav
      className="navbar is-success has-shadow is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <NavLink className="navbar-item" to="/">
          {LOGO}
        </NavLink>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbar" className="navbar-menu">
        <div className="navbar-start">{navbarItems}</div>
      </div>
    </nav>
  );
}
