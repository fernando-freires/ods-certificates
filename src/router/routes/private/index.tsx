import { Home } from "@pages/Home/home";
import { MyCertificates } from "@pages/MyCertificates/MyCertificates";
import { MyProfile } from "@pages/MyProfile/MyProfile";
import { IRoute } from "@router/interface";

const routes: readonly IRoute[] = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/myCertificates", element: <MyCertificates /> },
  { path: "/profile", element: <MyProfile /> },
];

export default routes;
