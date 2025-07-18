const express = require('express')
const crypto = require('node:crypto')
const cors = require('cors')
const app = express()

const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const movies = require('./movies.json')

app.disable('x-powered-by')
app.use(express.json())
app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
        'http://127.0.0.1:5500'
        ]

        if(ACCEPTED_ORIGINS.includes(origin)){
            return callback(null, true)
        }

        if (!origin){
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
}
))

app.get('/', (req, res) => {
    res.json({ message: 'Hola Mundo' })
})

//Todas las peliculas
app.get('/movies', (req, res) => {
    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})

//Pelicula por ID
app.get('/movies/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)

    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
})

//Crear Pelicula
app.post('/movies', (req, res) => {
    const result = validateMovie(req.body)

    if (result.error){
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }

    //Esto no sería REST, porque estamos guardando el estado de la app en memoria
    movies.push(newMovie)

    res.status(201).json(newMovie)
})

//Actualizar pelicula
app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body)
    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex < 0){
        return res.status(404).json({ message: 'Movie not found' })
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie

    return res.json(updateMovie)
})

//Eliminar pelicula
app.delete('/movies/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if(movieIndex < 0){
        return res.status(404).json({ message: 'Movie not found' })
    }

    movies.splice(movieIndex, 1)

    return res.json({ message: 'Movie Deleted' })
})

const PORT =process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`)
})