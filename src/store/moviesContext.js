import { createContext, useContext, useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";


const movieCtx = createContext([])

export const useMovieApi = () => {
    return useContext(movieCtx)
}



const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);

    const { isLoading, error, sendRequest: fetchMovies } = useHttp();
    useEffect(() => {
        const transformData = (movieList) => {
            setMovies(movieList.results.slice(0, 10));
        };

        fetchMovies(
            {
                url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
            },
            transformData
        );
    }, [fetchMovies]);

    return (
        <movieCtx.Provider value={{ isLoading, error, movies }}>
            {children}
        </movieCtx.Provider>
    )
}

export default MoviesProvider