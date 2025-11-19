export interface CardProps {
  name: string;
  image: string;
}

export function Card({ name, image }: CardProps) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={image} alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-header-title is-centered">{name}</div>
    </div>
  );
}
