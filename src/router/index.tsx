import { HashRouter } from "react-router-dom";
import { Renderer } from "./renderer";
import { AuthProvider } from "@context/AuthProvider";

const Router = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <Renderer />
      </AuthProvider>
    </HashRouter>
  );
};

export default Router;
