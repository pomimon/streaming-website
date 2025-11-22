import "./../index.css";
import React from "react";
import { Outlet } from "react-router";
import { useParams } from "react-router";
import { useState } from "react";
import { useLoaderData } from "react-router";

import { Navbar } from "./Components";
import { AVAILABLE_CATEGORIES } from "./Data";

export function AppLayout() {
  return (
    <>
      <Navbar links={AVAILABLE_CATEGORIES} />

      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
