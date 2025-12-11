/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Outlet } from "react-router";

import {
  Container,
  Footer,
  Hero,
  HeroBody,
  HeroFoot,
  Section,
  Title,
  Subtitle,
  NavTabs,
  NavTab,
} from "Components";

import { HomeRoute, StreamRoute } from "Routes";
import "./index.css";

import { CATEGORY_CARDS, CATEGORY_IMAGES } from "./config";

function Layout() {
  const home = <NavTab to="/">Home</NavTab>;

  const tabs = CATEGORY_CARDS.map(({ title, slug }) => (
    <NavTab key={slug} to={`/streams/${slug}`}>
      {title}
    </NavTab>
  ));

  return (
    <>
      <header>
        <Hero>
          <HeroBody>
            <Title text="Wildlife Streams" />
            <Subtitle text="Discover live streams of wildlife, pets, and nature from every corner of the planet" />
          </HeroBody>

          <HeroFoot>
            <NavTabs>
              {home}
              {tabs}
            </NavTabs>
          </HeroFoot>
        </Hero>
      </header>

      <Section>
        <Container>
          <Outlet />
        </Container>
      </Section>

      <Footer>
        <Container>
          <Subtitle text="Animal Streams" />
        </Container>
      </Footer>
    </>
  );
}

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomeRoute,
      },
      {
        path: "/streams/:category",
        Component: StreamRoute,
        loader: async ({ params: { category } }) => {
          const response = await fetch(`/api/streams/${category}`);
          const streams = await response.json();

          return {
            streams,
          };
        },
      },
      {
        path: "*",
        Component: () => <div>404</div>,
      },
    ],
  },
]);

const elem = document.getElementById("root")!;

const app = (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

if (import.meta.hot) {
  // With hot module reloading, `import.meta.hot.data` is persisted.
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  // The hot module reloading API is not available in production.
  createRoot(elem).render(app);
}
