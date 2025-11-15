import "./../index.css";
import React from "react";
import { Header, Desktop } from "./Components";

export function App() {
  return (
    <>
      <nav>
        <Header />
      </nav>

      <main>
        <Desktop />
      </main>
    </>
  );
}

export default App;
