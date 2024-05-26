import { AddStory } from "@pages/AddStory";
import { AddSnippet } from "@pages/AddSnippet";
import { Home } from "@pages/Home/home";
import { UpdateStory } from "@pages/UpdateStory";
import { IRoute } from "@router/interface";

const routes: readonly IRoute[] = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/addStory", element: <AddStory /> },
  { path: "/:id/addSnippet", element: <AddSnippet /> },
  { path: "/:id/updateStory", element: <UpdateStory /> },
];

export default routes;
