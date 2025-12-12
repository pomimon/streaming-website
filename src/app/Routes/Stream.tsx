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

const poweredRegex = /powered\s*by\s*explore\.org/i;

function getFriendlyName(name: string): string {
  return name.replace(poweredRegex, "").trim();
}

function StreamCard({
  ytid,
  name,
  thumbnail,
  onSelect,
}: Stream & { onSelect: (id: string) => void }) {
  const friendlyName = getFriendlyName(name);

  return (
    <Card key={ytid}>
      <CardHead>
        <CardPreview
          imageUrl={thumbnail}
          imageAlt={friendlyName}
          onClick={() => onSelect(ytid)}
        />
      </CardHead>
      <CardFoot>{friendlyName}</CardFoot>
    </Card>
  );
}

export function StreamRoute() {
  const streams = useLoaderData<Stream[]>();
  const { category } = useParams();
  const [currentStream, setCurrentStream] = useState("");

  return (
    <>
      <Cards>
        {streams.map((stream) => (
          <StreamCard
            key={stream.ytid}
            {...stream}
            onSelect={setCurrentStream}
          />
        ))}
      </Cards>

      {currentStream &&
        createPortal(
          <Modal onClose={() => setCurrentStream("")}>
            <iframe
              title={`YouTube Stream ${currentStream}`}
              width="100%"
              style={{ aspectRatio: "16 / 9" }}
              src={`https://www.youtube.com/embed/${currentStream}?rel=0&autoplay=1&mute=1&controls=1`}
              allow="autoplay; encrypted-media; picture-in-picture"
            />
          </Modal>,
          document.body,
        )}
    </>
  );
}
