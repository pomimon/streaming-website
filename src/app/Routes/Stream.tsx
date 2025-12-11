import { useParams } from "react-router";
import { useState } from "react";
import { useLoaderData } from "react-router";
import { createPortal } from "react-dom";
import styles from "./Home.module.css";
import {
  Card,
  CardFoot,
  CardHead,
  Cards,
  CardPreview,
  Modal,
  Container,
} from "Components";

interface Stream {
  ytid: string;
  name: string;
  info: string;
  broadcast: string;
  thumbnail: string;
  thumbnail_hires: string;
  opt_hires: number;
  opt_caption: number;
  stat_views: number;
  stat_likes: number;
  stat_comments: number;
}

function getFriendlyName(name: string): string {
  return name
    .replace("powered by EXPLORE.org", "")
    .replace("powered by explore.org", "")
    .replace("powered by Explore.org", "")
    .replace("powered byEXPLORE.org", "")
    .trim();
}

export function StreamRoute() {
  const { streams }: { streams: Stream[] } = useLoaderData();
  const { category } = useParams();
  const [currentStream, setCurrentStream] = useState("");

  // console.log(streams);
  // console.log(category);

  const cards = streams.map(({ ytid, name, thumbnail }) => {
    const friendlyName = getFriendlyName(name);

    if (friendlyName.toLowerCase().includes("explore.org")) {
      console.log("TODO: get friendly name", name);
    }

    return (
      <Card key={ytid}>
        <CardHead>
          <CardPreview
            imageUrl={thumbnail}
            onClick={() => setCurrentStream(ytid)}
          />
        </CardHead>

        <CardFoot>{friendlyName}</CardFoot>
      </Card>
    );
  });

  const modal = createPortal(
    <Modal onClose={() => setCurrentStream("")}>
      <iframe
        width="100%"
        style={{ aspectRatio: "16 / 9" }}
        src={`https://www.youtube.com/embed/${currentStream}?rel=0&autoplay=1&mute=1&controls=1`}
        allow="autoplay 'src'"
      />
    </Modal>,
    document.body,
  );

  return (
    <>
      <Cards>{cards}</Cards>
      {currentStream && modal}
    </>
  );
}
