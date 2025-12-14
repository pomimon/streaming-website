import styles from "./Title.module.css";

interface TitleProps {
  text: string;
}

export function Title({ text }: TitleProps) {
  return <p className={styles.title}>{text}</p>;
}

export function Subtitle({ text }: TitleProps) {
  return <p className={styles.subtitle}>{text}</p>;
}
