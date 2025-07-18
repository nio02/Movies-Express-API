import z from 'zod'

const movieSchema = z.object({
        title: z.string({
            invalid_type_error: 'Movie must be a string',
            required_error: 'Movie title is required.'
        }),
        year: z.number().int().min(1800).max(2025),
        director: z.string({
            invalid_type_error: 'Director must be a string',
            required_error: 'Movie director is required.'
        }),
        duration: z.number().int().positive(),
        poster: z.url({
            message: 'Poster must be a valid url'
        }),
        genre: z.array(
            z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horro', 'Thriller', 'Sci-fi', 'Crime']),
            {
                required_error: 'Movie genre is required',
                invalid_type_error: 'Must be an array of enum genre'
            }
        ),
        rate: z.number().min(0).max(10),
    })

export function validateMovie(object){
    return movieSchema.safeParse(object)
}

export function validatePartialMovie(object){
    return movieSchema.partial().safeParse(object)
}