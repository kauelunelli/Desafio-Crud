import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { LoginPage } from "./pages/login";
import { HomePage } from "./pages/home";
import { SignupPage } from "./pages/signup";
import { ReactNode, useEffect, useState } from "react";
import { isAuthenticated } from "./services/UserService";

function RequireAuth({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setAuth(authenticated);
    };

    checkAuth();
  }, []);

  if (auth === null) {
    return null;
  }

  return auth ? children : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <HomePage />,
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: (
      <RequireAuth>
        <SignupPage />
      </RequireAuth>
    ),
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
