import {API_BASE_URL} from "../constants/baseUrls";

export const FetchApi = ((endpoint: string) => {
    return fetch(`${API_BASE_URL}/${endpoint}`)
        .then((response) =>
            response.json())
        .catch((error) => console.warn(error))
});
