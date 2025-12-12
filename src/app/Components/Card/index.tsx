import styles from "./Card.module.css";

interface Props {
  children?: React.ReactNode;
}

interface CardPreviewProps {
  imageUrl: string;
  imageAlt: string;
  onClick?: () => void;
}

export function Card({ children }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export function CardHead({ children }: Props) {
  return <div className={styles.header}>{children}</div>;
}

export function CardFoot({ children }: Props) {
  return <div className={styles.footer}>{children}</div>;
}

export function Cards({ children }: Props) {
  return <div className={styles.grid}>{children}</div>;
}

export function CardPreview({ imageUrl, imageAlt, onClick }: CardPreviewProps) {
  return (
    <div onClick={onClick} className={styles.preview}>
      <img src={imageUrl} alt={imageAlt} />
    </div>
  );
}
