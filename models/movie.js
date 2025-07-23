import { readJSON } from '../utils.js'
import { randomUUID } from 'node:crypto'

const movies = readJSON('./movies.json')

export class MovieModel{
    static async getAll({ genre }){
        if (genre) {
            const filteredMovies = movies.filter(
                movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
            return filteredMovies
        }
        return movies
    }

    static async getById({ id }){
        const movie = movies.find(movie => movie.id === id)
        return movie
    }

    static async create(input){
        const newMovie = {
            id: randomUUID(),
            ...input
        }
        movies.push(newMovie)
        return newMovie
    }

    static async deleteById({ id }){
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if(movieIndex < 0) return false

        movies.splice(movieIndex, 1)
        return true
    }

    static async updateById({ id, input }){
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if (movieIndex < 0) return false

        const updateMovie = {
            ...movies[movieIndex],
            ...input
        }

        movies[movieIndex] = updateMovie
        return movies[movieIndex]
    }
}