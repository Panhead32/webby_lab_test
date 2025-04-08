import { validationResult } from 'express-validator';
import { Request, Response } from "express";
import { MovieService } from '../services';

export default class MovieController {

    static async addMovie(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ status: 0, errors: errors.array() });
        }

        try {
            const { title, year, format, actors } = req.body;
            const movie = await MovieService.addMovie({ title, year, format, actors });
            res.status(201).json({ status: 1, data: movie });
        } catch (error) {
            console.error("Error adding movie:", error);
            res.status(500).json({ status: 0, message: "An error occurred while adding the movie" });
        }
    }

    static async deleteMovie(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ status: 0, errors: errors.array() });
        }

        try {
            const { id } = req.params;
            const result = await MovieService.deleteMovie({ id: Number(id) });

            if (!result.success) {
                res.status(404).json({ status: 0 });
            }

            res.status(200).json({ status: 1 });
        } catch (error) {
            console.error("Error deleting movie:", error);
            res.status(500).json({ message: "An error occurred while deleting the movie" });
        }
    }

    static async getMovieById(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }

        try {
            const { id } = req.params;
            const result = await MovieService.getMovieById({ id: Number(id) });

            if (result.error) {
                res.status(404).json({ status: 0, message: result.error });
            }

            res.status(200).json({ status: 1, data: result.movie });
        } catch (error) {
            console.error("Error fetching movie:", error);
            res.status(500).json({ status: 0, message: "An error occurred while fetching the movie" });
        }
    }

    static async getMovies(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }

        try {
            const { title, actor, search, sort, order, limit, offset } = req.query;

            const filters = {
                title: title ? String(title) : undefined,
                actor: actor ? String(actor) : undefined,
                search: search ? String(search) : undefined,
                sort: sort ? String(sort) : undefined,
                order: order ? String(order) : undefined,
                limit: limit ? Number(limit) : undefined,
                offset: offset ? Number(offset) : undefined
            };

            const { total, data } = await MovieService.getMovies(filters);
            res.status(200).json({ status: 1, meta: { total }, data });
        } catch (error) {
            console.error("Error fetching movies:", error);
            res.status(500).json({ message: "An error occurred while fetching movies" });
        }
    }

    static async importMovies(req: Request, res: Response) {
        try {
            if (!req.file) {
                res.status(400).json({ message: "No file uploaded" });
            }

            const result = await MovieService.importMovies({ fileBuffer: req.file.buffer });

            if (!result.data.length) {
                res.status(400).json({ data: [], meta: { total: 0, imported: 0 }, status: 1 });
            }

            res.status(200).json({ data: result.data, meta: { total: result.data.length, imported: result.count }, status: 1 });
        } catch (error) {
            console.error("Error importing movies:", error);
            res.status(500).json({
                message: "An error occurred while importing movies",
                error: error.message
            });
        }
    }
}
