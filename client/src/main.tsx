import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import CountryListPage from "./pages/CountryListPage";
import CountryDetailPage from "./pages/CountryDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: CountryListPage,
  },
  {
    path: "/country/:code",
    Component: CountryDetailPage,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
