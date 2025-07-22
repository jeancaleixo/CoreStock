import routerUser from "./User.js";
import routerProduct from "./Product.js";

export default (app) => {
  app.use(routerUser);
  app.use(routerProduct);
};
