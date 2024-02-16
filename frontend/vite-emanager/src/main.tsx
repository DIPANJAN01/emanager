import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Branch from "./components/pages/Branch.tsx";
import Employee from "./components/pages/Employee.tsx";
import Admin from "./components/pages/Admin/Admin.tsx";
import { SnackbarProvider } from "notistack";
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
    errorElement: <div>404 Not Found</div>,
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
