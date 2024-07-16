import { Home } from "@pages/Home/home";
import { MyCertificates } from "@pages/MyCertificates/MyCertificates";
import { IRoute } from "@router/interface";

const routes: readonly IRoute[] = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/myCertificates", element: <MyCertificates /> },
];

export default routes;
