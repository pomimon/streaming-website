import { NavLink } from "react-router";
import { useLoaderData } from "react-router";

import type { ICategory } from "./../../frontend.tsx";
import aquatic from "./../assets/aquatic.jpg";
import bird from "./../assets/bird.jpg";
import pets from "./../assets/pets.jpg";
import reptiles from "./../assets/reptiles.jpg";
import zebra from "./../assets/zebra-aw.jpg";
import zoo from "./../assets/zoo.jpg";

const IMAGES: { [key: string]: string } = {
  aquatic,
  bird,
  pets,
  reptiles,
  zebra,
  zoo,
};

function HomePageHero() {
  return (
    <>
      <section className="hero is-halfheight hero-background has-radius-large">
        <div className="hero-body">
          <div>
            <p className="title has-text-white">Wildlife Streaming</p>
            <p className="subtitle has-text-white">
              Discover live streams of wildlife, pets, and nature from every
              corner of the planet
            </p>
          </div>
        </div>
      </section>
      <div>
        <p className="is-underlined is-size-4 has-text-weight-semibold category-title">
          Categories:
        </p>
      </div>
    </>
  );
}

export function HomePage() {
  const { categories }: { categories: ICategory[] } = useLoaderData();

  const cards = categories.map(({ name, slug }) => (
    <div
      className="column is-one-third-desktop is-half-tablet is-full-mobile"
      key={name}
    >
      <NavLink to={`/streams/${name}`}>
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={IMAGES[slug]} alt={`${name} Streams`} />
            </figure>
          </div>
          <div className="card-header-title is-centered">{name}</div>
        </div>
      </NavLink>
    </div>
  ));

  return (
    <>
      <HomePageHero />

      <div className="columns is-multiline">{cards}</div>
    </>
  );
}
