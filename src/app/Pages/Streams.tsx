import { useParams } from "react-router";
import { useState } from "react";
import { useLoaderData } from "react-router";

import ph from "./../assets/placeholder-images/ph.jpg";
import { ReactNativeQueryRunner } from "typeorm/browser/driver/react-native/ReactNativeQueryRunner.js";

interface StreamProps {
  active: boolean;
  url: string;
  stream: StreamData;
  onOpen: () => void;
  onClose: () => void;
}

interface StreamData {
  id: string;
  info: string;
  title: string;
}

function getPreviewImage(stream) {
  if (stream.info.preview_standard) {
    return stream.info.preview_standard;
  }

  if (stream.info.preview_default) {
    return stream.info.preview_default;
  }

  console.log("missing preview", stream.id, stream.info);

  return ph;
}

export function StreamPreview({ active, stream, onOpen }) {
  if (active) {
    return <iframe className="has-ratio" src={getVideoUrl(stream.id)}></iframe>;
  }

  const isLive = stream.info.live_broadcast_content == "live";

  return (
    <div onClick={() => onOpen()}>
      <img src={getPreviewImage(stream)} alt="Placeholder Image" />
      {isLive && <span className="tag is-danger live-marker">Live</span>}
    </div>
  );
}

export function Stream({ active, url, stream, onOpen, onClose }: StreamProps) {
  const classNames = ["column", "mb-3", active ? "is-full" : "is-half"];

  return (
    <div className={classNames.join(" ")} id={`stream-${stream.id}`}>
      <div className="card stream-card ">
        <figure className="image is-16by9">
          <StreamPreview active={active} stream={stream} onOpen={onOpen} />
        </figure>

        {active && (
          <button
            className="delete is-large"
            onClick={() => onClose()}
          ></button>
        )}

        <div className="stream-info-title">{stream.info.title}</div>
        <div className="stream-info">
          {/*<span>Channel Name: </span>*/}
          <a
            href={`https://www.youtube.com/channel/${stream.info.channel_id}`}
            target="_blank"
            rel="noreferrer"
          >
            {stream.info.channel_title}
          </a>
          {/*<div className="block">
            <code>
              {JSON.stringify({ ...stream.info, description: "" }, null, 2)}
            </code>
          </div>*/}
        </div>
      </div>
    </div>
  );
}

function getStreamPosition(id: string): number {
  const element = document.getElementById(`stream-${id}`);
  const navbar = document.querySelector(".navbar");

  if (element && navbar) {
    const rect = element.getBoundingClientRect();
    const navRect = navbar.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop;

    return scrollTop + rect.top - navRect.height - 10;
  }

  return 0;
}

function getVideoUrl(id: string): string {
  return `https://www.youtube.com/embed/${id}?rel=0`;
}

export function CategoryPage() {
  const { streams } = useLoaderData();
  const { category } = useParams();
  const [currentStream, setCurrentStream] = useState("");
  console.log(streams);
  if (streams.length == 0) {
    return <div>No streams found :_(</div>;
  }

  function openStream(id: string) {
    setCurrentStream(id);

    requestAnimationFrame(() => {
      window.scrollTo(0, getStreamPosition(id));
    });
  }

  function closeStream(id: string) {
    setCurrentStream("");

    requestAnimationFrame(() => {
      window.scrollTo(0, getStreamPosition(id));
    });
  }

  const streamComponents = streams.map((stream: StreamData) => {
    return (
      <Stream
        url={getVideoUrl(stream.id)}
        stream={stream}
        key={stream.id}
        active={currentStream == stream.id}
        onOpen={() => openStream(stream.id)}
        onClose={() => closeStream(stream.id)}
      />
    );
  });

  return (
    <>
      <h1 className="title mb-5">{category ? category : "CATEGORY"}</h1>
      <div className="columns is-multiline">{streamComponents}</div>
    </>
  );
}
