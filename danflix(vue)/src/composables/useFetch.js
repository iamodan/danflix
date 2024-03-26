import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzRjODQ5NTU0Mzc2ZTYxYzAyODg3NGI3ZGUwZWEwNCIsInN1YiI6IjY1ZjliZjM0MDcxNjUwMDE3ZGVmMGViZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J-Mye_ayFGIuJaBcvgjM3DNJyzPbf-7Ie9O7dpjz-xI",
  },
});

export async function useFetch(url, method = "get", payload, headers = {}) {
  try {
    const options = {
      url,
      method,
      headers,
    };

    if (method === "get" && payload) options.params = payload;
    if (method !== "get" && payload) options.data = payload;
    const response = await axiosInstance(options);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}
// 