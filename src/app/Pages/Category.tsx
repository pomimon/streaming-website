import { useParams } from "react-router";
import { AVAILABLE_STREAMS } from "./../Data";

export function CategoryPage() {
  const { category } = useParams();

  // return <div>{`You're on the ${category} Stream Page`}</div>;

  const streams = AVAILABLE_STREAMS.filter((stream) => {
    return stream.category == category;
  });

  if (streams.length == 0) {
    return <div>No streams found :_(</div>;
  }

  // loops through(maps) stream data to find name and url
  // returns name and url in rightful place
  const streamComponents = streams.map(({ name, url }) => {
    return (
      <div className="column is-half mb-3">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">{name}</p>
          </header>

          <div className="card-content">
            <figure className="image is-16by9">
              <iframe className="has-ratio" src={url}></iframe>
            </figure>
          </div>
        </div>
      </div>
    );
  });

  return <div className="columns is-multiline">{streamComponents}</div>;
}
// className="streams-container
