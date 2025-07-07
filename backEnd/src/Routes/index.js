import routerTest from "./test.js";
import routerUser from "./User.js";

export default (app) => {
  app.use(routerTest);
  app.use(routerUser);
};
