import styles from "./Footer.module.css";

interface FooterProps {
  children: React.ReactNode;
}

export function Footer({ children }: FooterProps) {
  return <footer className={styles.footer}>{children}</footer>;
}
