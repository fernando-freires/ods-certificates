import { Home } from "@pages/Home/home";
import { CreateProduct } from "@pages/Products/CreateProduct/createProduct";
import { EditProduct } from "@pages/Products/EditProduct/editProduct";
import { IRoute } from "@router/interface";

const routes: readonly IRoute[] = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/createProduct", element: <CreateProduct /> },
  { path: "/product/edit/:productId", element: <EditProduct /> },
];

export default routes;
