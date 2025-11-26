import { Outlet } from "react-router";

import { Navbar } from "./Navbar";

export function AppLayout() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <section className="section">
        <div className="container">
          <Outlet />
        </div>
      </section>

      <footer className="footer has-background-primary">
        <div className="container">
          <div className="content has-text-centered has-text-white">
            Animal Streams
          </div>
        </div>
      </footer>
    </>
  );
}
