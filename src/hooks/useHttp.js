import { useCallback, useState } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjEyYTJmODFlNTMzNDU1NTVhYjY0MjIyZjYzYzY2ZiIsInN1YiI6IjY0ZmVmZWM1ZmZjOWRlMGVkZjYwMjU1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J6PjXeJHWMZlsxgqN6v6kWPjFCV6RHajjqke0d5KMiY'
                },
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            applyData(data)
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest
    }

}

export default useHttp;

 // // Search parameters
  // useEffect(() => {
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjEyYTJmODFlNTMzNDU1NTVhYjY0MjIyZjYzYzY2ZiIsInN1YiI6IjY0ZmVmZWM1ZmZjOWRlMGVkZjYwMjU1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J6PjXeJHWMZlsxgqN6v6kWPjFCV6RHajjqke0d5KMiY'
  //     }
  //   };

  //   fetch(`https://api.themoviedb.org/3/search/movie?query=Meg&language=en-US&page=1`, options)
  //     .then(response => response.json())
  //     .then(response => console.log(response))
  //     .catch(err => console.error(err));
  // }, [])
