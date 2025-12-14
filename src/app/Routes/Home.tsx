import { NavLink } from "react-router";

import styles from "./Home.module.css";
import { CATEGORY_CARDS } from "./../../config";
import { Card, CardFoot, CardPreview, CardHead, Cards } from "Components";

export function HomeRoute() {
  const cards = CATEGORY_CARDS.map(({ image, title, slug }) => (
    <Card key={title}>
      <CardHead>
        <NavLink to={`/streams/${slug}`} style={{ width: "100%" }}>
          <CardPreview imageUrl={image} />
        </NavLink>
      </CardHead>

      <CardFoot>
        <h2 className={styles.title}>{title}</h2>
      </CardFoot>
    </Card>
  ));

  return <Cards>{cards}</Cards>;
}
