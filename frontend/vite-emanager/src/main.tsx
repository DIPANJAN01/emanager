import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { SnackbarProvider } from "notistack";
import NotFound from "./components/pages/NotFound.tsx";
import Employee from "./components/pages/Employee/Employee.tsx";
import Branch from "./components/pages/Branch/Branch.tsx";
import Admin from "./components/pages/Admin/Admin.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SnackbarProvider
        maxSnack={1}
        preventDuplicate={false}
        autoHideDuration={3000}
      >
        <App />
      </SnackbarProvider>
    ),
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Employee /> },
      { path: "/employees", element: <Employee /> },
      { path: "/branches", element: <Branch /> },
      { path: "/admins", element: <Admin /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
