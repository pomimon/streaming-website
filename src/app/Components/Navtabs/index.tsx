import { NavLink } from "react-router";

import styles from "./Navtabs.module.css";

interface NavTabsProps {
  children: React.ReactNode;
}

interface NavTabProps {
  to: string;
  children: React.ReactNode;
}

export function NavTabs({ children }: NavTabsProps) {
  return <nav className={styles.tabs}>{children}</nav>;
}

export function NavTab({ to, children }: NavTabProps) {
  return <NavLink to={to}>{children}</NavLink>;
}
