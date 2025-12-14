import landscape from "Assets/background.jpg";
import styles from "./Banner.module.css";

interface HeroProps {
  children: React.ReactNode;
  image?: string;
}

interface HeroBodyProps {
  children: React.ReactNode;
}

interface HeroFootProps {
  children: React.ReactNode;
}

export function Hero({ children, image = landscape }: HeroProps) {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${image})` }}
    >
      {children}
    </section>
  );
}

export function HeroBody({ children }: HeroBodyProps) {
  return <div className={styles.body}>{children}</div>;
}

export function HeroFoot({ children }: HeroFootProps) {
  return <div className={styles.foot}>{children}</div>;
}

// Hero.Body = HeroBody
// Hero.Foot = HeroFoot
//
