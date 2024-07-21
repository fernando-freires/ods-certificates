import { Home } from "@pages/Home/home";
import { InitialRegistration } from "@pages/InitialRegistration/initialRegistration";
import { Login } from "@pages/Login/login";
import { IRoute } from "@router/interface";
import { BrowserRouter as Router, Route } from "react-router-dom";

const routes: readonly IRoute[] = [
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <InitialRegistration /> },
];

export default routes;

// const publicRoutes = () => (
//   <Router>
//     <Route path="/" Component={Home} />
//     <Route path="/login" Component={Login} />
//     <Route path="/register" Component={InitialRegistration} />
//   </Router>
// );

// export default publicRoutes;
