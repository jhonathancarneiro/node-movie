import { Router } from "express";
import * as userController from "../controllers/user.controller"
import * as movieController from "../controllers/movie.controller"
import { Auth } from "../middleware/auth";

const routes = Router();

routes.post("/register", userController.register)
routes.post("/login", userController.login)
routes.get("/user", Auth, userController.user)

routes.get("/movies", Auth, movieController.allmovies)
routes.post("/movie", Auth, movieController.create)

export {routes}
