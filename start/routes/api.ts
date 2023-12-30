import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/auth/login", "AuthController.login");
  Route.post("/auth/register", "AuthController.register");

  //   * Private routes
  Route.group(() => {
    Route.get("/user", "AuthController.getUser");
    Route.post("/auth/logout", "AuthController.logout");
  }).middleware("auth:api");
}).prefix("/api");
