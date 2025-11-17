import { AVAILABLE_STREAMS } from "./../Data";

interface StreamsProps {
  category: string;
}

export function Streams({ category }: StreamsProps) {
  const streams = AVAILABLE_STREAMS.filter((stream) => {
    return stream.category == category;
  });

  if (streams.length == 0) {
    return <div>No streams found :_(</div>;
  }

  const streamComponents = streams.map(({ name, url }) => {
    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">{name}</p>
        </header>

        <div className="card-content">
          <figure className="image is-16by9">
            <iframe
              className="has-ratio"
              width="640"
              height="360"
              src={url}
            ></iframe>
          </figure>
        </div>
      </div>
    );
  });

  return <div>{streamComponents}</div>;
}
