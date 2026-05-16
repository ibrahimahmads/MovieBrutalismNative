import { MovieDetailType, Reviews, TrailerList } from "../types/movie";
import { api } from "./api";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export async function getDetailMovie(movieId:number):Promise<MovieDetailType> {
    const res = await api.get(`/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
    return res.data
}

export async function getTrailerMovie(movieId:number):Promise<TrailerList[]> {
    const res = await api.get(`/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
    return res.data.results
}

export async function getReviewsMovie(movieId:number,pageNumber:number):Promise<Reviews[]> {
    const res = await api.get(`/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=${pageNumber}`)
    return res.data.results
}