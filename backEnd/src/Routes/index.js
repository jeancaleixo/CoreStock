import routerUser from "./User.js";
import routerProduct from "./Product.js";
import routerCategory from "./Category.js"

export default (app) => {
  app.use(routerUser);
  app.use(routerProduct);
  app.use(routerCategory)
};
