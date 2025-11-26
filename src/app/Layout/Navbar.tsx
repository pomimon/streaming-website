import { NavLink } from "react-router";
import { useLoaderData } from "react-router";

const LOGO = <h1>Home</h1>;

export function Navbar() {
  const { categories } = useLoaderData();

  const navbarItems = categories.map(({ name }) => {
    return (
      <NavLink className="navbar-item" key={name} to={`/streams/${name}`}>
        {name}
      </NavLink>
    );
  });

  return (
    <nav
      id="navbar"
      className="navbar is-primary has-shadow is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
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

        <div className="navbar-menu">
          <div className="navbar-start">{navbarItems}</div>

          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>

              <div className="navbar-dropdown is-right">
                <a className="navbar-item">About</a>
                <a className="navbar-item">Jobs</a>
                <a className="navbar-item">Contact</a>
                <a className="navbar-item">Report an issue</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
