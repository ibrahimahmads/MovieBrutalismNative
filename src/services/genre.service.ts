import { Genres, Movie } from "../types/movie";
import { api } from "./api";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export async function getGenres():Promise<Genres> {
    const res = await api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    return res.data
}

export async function getMoviesByGenre(genreId:number,pageNumber:number):Promise<Movie[]> {
    const res = await api.get(`/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${pageNumber}&language=en-US&sort_by=popularity.desc`)
    return res.data.results
}