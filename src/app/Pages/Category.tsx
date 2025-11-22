import { useParams } from "react-router";
import { useState } from "react";

import { YouTubeStream } from "./../Utils";

interface StreamProps {
  active: boolean;
  url: string;
  id: string;
  onOpen: () => void;
  onClose: () => void;
}

export function Stream({ active, url, id, onOpen, onClose }: StreamProps) {
  if (active) {
    return (
      <div className="column mb-3 is-full" id={`stream-${id}`}>
        <div className="card">
          <div className="block">
            <button className="button is-danger" onClick={() => onClose()}>
              exit
            </button>
          </div>
          <figure className="image is-16by9">
            <iframe className="has-ratio" src={url}></iframe>;
          </figure>
        </div>
      </div>
    );
  }

  return (
    <div className="column mb-3 is-half" id={`stream-${id}`}>
      <div className="card" onClick={() => onOpen()}>
        <figure className="image is-16by9">
          <div>stream preview</div>
        </figure>
      </div>
    </div>
  );
}

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();

  const [currentStream, setCurrentStream] = useState("");

  if (typeof category != "string") {
    return <div>No category provided</div>;
  }
  const streams: YouTubeStream[] = YouTubeStream.findByCategory(category);

  if (streams.length == 0) {
    return <div>No streams found :_(</div>;
  }

  // console.log("streams", streams);

  function getStreamPosition(id: string): number {
    const element = document.getElementById(`stream-${id}`);
    const navbar = document.querySelector(".navbar");

    if (element && navbar) {
      const rect = element.getBoundingClientRect();
      const navRect = navbar.getBoundingClientRect();
      const scrollTop = document.documentElement.scrollTop;

      return scrollTop + rect.top - navRect.height;
    }

    return 0;
  }

  function openStream(id: string) {
    setCurrentStream(id);

    requestAnimationFrame(() => {
      window.scrollTo(0, getStreamPosition(id));
    });
  }

  function closeStream() {
    setCurrentStream("");
  }

  const streamComponents = streams.map(({ id, url }) => {
    return (
      <Stream
        url={url}
        id={id}
        key={id}
        active={currentStream == id}
        onOpen={() => openStream(id)}
        onClose={() => closeStream()}
      />
    );
  });

  return <div className="columns is-multiline">{streamComponents}</div>;
}
