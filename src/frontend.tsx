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

import "./index.css";
import { AppLayout } from "./app/Layout";
import { HomePage, CategoryPage } from "./app/Pages";

interface ICategory {
  name: string;
  slug: string;
}

interface ICategoriesLoader {
  currentRequest?: Promise<ICategory[]>;
  getCategories: () => Promise<ICategory[]>;
}

const CategoriesLoader: ICategoriesLoader = {
  currentRequest: undefined,

  async getCategories() {
    if (CategoriesLoader.currentRequest) {
      return await CategoriesLoader.currentRequest;
    }

    const request = fetch("/api/categories").then((response) =>
      response.json(),
    );

    CategoriesLoader.currentRequest = request;

    return await request;
  },
};

const router = createBrowserRouter([
  {
    Component: AppLayout,
    loader: async () => {
      return {
        categories: await CategoriesLoader.getCategories(),
      };
    },
    children: [
      {
        index: true,
        Component: HomePage,
        loader: async () => {
          return {
            categories: await CategoriesLoader.getCategories(),
          };
        },
      },
      {
        path: "/streams/:category",
        Component: CategoryPage,
        loader: async ({ params: { category } }) => {
          const response = await fetch(`/api/streams/${category}`);
          const videoIds = await response.json();

          return {
            streams: videoIds,
          };
        },
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
