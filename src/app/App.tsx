import "./../index.css";
import React from "react";
import { Navbar, CardGrid, Streams } from "./Components";
import { AVAILABLE_CATEGORIES } from "./Data";
import { findStreamsByTag } from "./Utils";
import { useState } from "react";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  { path: "/stream", Component: StreamPage },
]);

// enum - group of constants that do not change
enum Page {
  Home,
  Stream,
}

export function App() {
  const [currentPage, setCurrentPage] = useState(Page.Home);
  const [currentCategory, setCurrentCategory] = useState("");

  //
  function onNavBarClick(category: string) {
    if (category == "Home") {
      setCurrentPage(Page.Home);
    } else {
      setCurrentPage(Page.Stream);
      setCurrentCategory(category);
    }
  }

  let pageContent = <div>Something went wrong</div>;

  if (currentPage == Page.Home) {
    pageContent = <CardGrid cards={AVAILABLE_CATEGORIES} />;
  } else if (currentPage == Page.Stream) {
    pageContent = <Streams category={currentCategory} />;
  }

  return (
    <>
      <Navbar links={AVAILABLE_CATEGORIES} onClick={onNavBarClick} />
      <div className="container">{pageContent}</div>
    </>
  );
}

export default App;
//
