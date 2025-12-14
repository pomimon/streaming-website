import styles from "./Section.module.css";

interface SectionProps {
  children: React.ReactNode;
}

export function Section({ children }: SectionProps) {
  return <section className={styles.section}>{children}</section>;
}
