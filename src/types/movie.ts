export interface Genres{
    genres:Genre[]
}

type Genre = {
    id:number,
    name:string
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview:string;
  vote_average: number;
}

export interface MovieDetailType {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview:string;
  vote_average: number;
  genres:Genre[];
}

export interface TrailerList{
    name:string;
    key:string;
    site:string;
    type:string;
    id:string;
}

export interface Reviews{
    author:string;
    content:string;
    created_at:Date;
    id:string;
}