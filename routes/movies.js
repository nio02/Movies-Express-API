import { Router } from "express";
import { MovieController } from "../controllers/movies.js";

export const moviesRouter = Router()

//Todas las peliculas
moviesRouter.get('/', MovieController.getAll)

//Pelicula por ID
moviesRouter.get('/:id', MovieController.getById)

//Crear Pelicula
moviesRouter.post('/', MovieController.create)

//Actualizar pelicula
moviesRouter.patch('/:id', MovieController.updateById)

//Eliminar pelicula
moviesRouter.delete('/:id', MovieController.deleteById)