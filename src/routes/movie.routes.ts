import { Router } from "express";
import { upload } from "../middlewares";
import { check } from "express-validator";
import { MovieController } from "../controllers";
import { authMiddleware } from '../middlewares/auth.middleware';

class MovieRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/",
      authMiddleware,
      [
        check("title", "Title is required").not().isEmpty(),
        check("year", "Year is required and must be a number").isInt({ max: new Date().getFullYear() }),
        check("format", "Format is required and must be one of: VHS, DVD, Blu-ray").isIn(["VHS", "DVD", "Blu-ray"]),
        check("actors", "Actors must be a string").isArray()
      ],
      MovieController.addMovie);
    this.router.delete("/:id",
      authMiddleware,
      [check("id", "Invalid movie ID").isInt()],
      MovieController.deleteMovie);
    this.router.post("/import",
      authMiddleware,
      upload.single("file"),
      MovieController.importMovies);
    this.router.get("/",
      authMiddleware,
      [
        check("title", "Title must be a string").isString().optional(),
        check("actor", "Actor must be a string").isString().optional(),
        check("search", "Search must be a string").isString().optional(),
        check("sort", "Sort must be a string").isString().optional(),
        check("order", "Order must be a string").isString().optional(),
        check("limit", "Limit must be a number").isInt().optional(),
        check("offset", "Offset must be a number").isInt().optional()
      ],
      MovieController.getMovies);
    this.router.get("/:id",
      authMiddleware,
      [check("id", "Invalid movie ID").isInt()],
      MovieController.getMovieById);
  }
}

export default new MovieRoutes().router;
