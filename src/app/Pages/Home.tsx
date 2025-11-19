import { AVAILABLE_CATEGORIES } from "./../Data";
import { NavLink } from "react-router";

export function HomePage() {
  const cards = AVAILABLE_CATEGORIES.map(({ name, image }) => {
    return (
      <NavLink
        to={`/streams/${name}`}
        className="column is-one-third-desktop is-half-tablet is-full-mobile"
        key={name}
      >
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={image} alt="Placeholder image" />
            </figure>
          </div>
          <div className="card-header-title is-centered">{name}</div>
        </div>
      </NavLink>
    );
  });

  return <div className="columns is-multiline is-mobile ">{cards}</div>;
}
