import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useFetch } from "@/composables/useFetch";

export const useMovieStore = defineStore("movie", () => {
  const movieDiscoverList = ref([]);
  const movieDiscoverListLoading = ref(false);

  const moviePlayingList = ref([]);
  const moviePlayListLoading = ref(false);

  const moviePopularList = ref([]);
  const moviePopularListLoading = ref(false);

  const movieUpComingList = ref([]);
  const movieUpComingListLoading = ref(false);

  const movieTopRatedList = ref([]);
  const movieTopRatedListLoading = ref(false);

  const movieDetailList = ref([]);
  const movieDetailListLoading = ref(false);

  const movieTrailerList = ref([]);
  const movieTrailerListLoading = ref(false);

  const movieCreditList = ref([]);
  const movieCreditListLoading = ref(false);

  const movieMoreList = ref([]);
  const movieMoreLoading = ref(false);
  const movieMoreListLoading = ref(false);

  const getMovieDiscover = async (page = 1, genres) => {
    try {
      movieDiscoverListLoading.value = true;
      const response = await useFetch("/discover/movie", "get", {
        language: "ja",
        page,
        with_genres: genres,
      });
      // console.log("response :: " + response);
      movieDiscoverList.value = response.data.results;
      movieDiscoverListLoading.value = false;
    } catch (e) {
      alert(e.message);
    }
  };

  /**
   * // 현재 상영중인 영화 목록
   * @param {*} page
   */
  const getMoviePlaying = async (page = 1) => {
    try {
      moviePlayListLoading.value = true;
      const response = await useFetch("/movie/now_playing", "get", {
        language: "ja",
        page,
      });
      moviePlayingList.value = response.data.results;
      moviePlayListLoading.value = false;
    } catch (e) {
      alert(e.message);
    }
  };

  /**
   * // 인기 상영중인 영화 목록
   * @param {*} page
   */
  const getMoviePopular = async (page = 1) => {
    try {
      moviePopularListLoading.value = true;
      const response = await useFetch("/movie/popular", "get", {
        language: "ja",
        page,
      });
      moviePopularList.value = response.data.results;
      moviePopularListLoading.value = false;
    } catch (e) {
      alert(e.message);
    }
  };

  /**
   * //개봉예정작
   * @param {*} page
   */
  const getMovieUpComing = async (page = 1) => {
    try {
      movieUpComingListLoading.value = true;
      const response = await useFetch("/movie/upcoming", "get", {
        language: "ja",
        page,
      });
      movieUpComingList.value = response.data.results;
      movieUpComingListLoading.value = false;
    } catch (e) {
      alert(e.message);
    }
  };

  /**
   * // 높은 평점을 받은 영화
   * @param {*} page
   */
  const getMovieTopRated = async (page = 1) => {
    try {
      movieTopRatedListLoading.value = true;
      const response = await useFetch("/movie/top_rated", "get", {
        language: "ja",
        page,
      });
      movieTopRatedList.value = response.data.results;
      movieTopRatedListLoading.value = false;
    } catch (e) {
      alert(e.message);
    }
  };

  /**
   * 상세 영화 정보
   * @param {*} page
   */
  const getMovieDetail = async (id) => {
    try {
      movieDetailListLoading.value = true;
      const response = await useFetch("/movie/" + id, "get", {
        language: "ja",
      });
      movieDetailList.value = response.data;
      movieDetailListLoading.value = false;
    } catch (e) {
      alert(e.message);
    }
  };

  /**
   * 영화 트레일러 정보
   * @param {*} page
   */
  const getMovieTrailer = async (id) => {
    try {
      movieTrailerListLoading.value = true;
      const response = await useFetch(`/movie/${id}/videos`, "get");
      movieTrailerList.value = response.data.results;
      movieTrailerListLoading.value = false;
    } catch (e) {
      alert(e.message);
    }
  };

  /**
   * 출연자
   * @param {*} page
   */
  const getMovieCredits = async (id) => {
    try {
      movieCreditListLoading.value = true;
      const response = await useFetch(`/movie/${id}/credits`, "get");
      movieCreditList.value = response.data;
      movieMoreLoading.value = false;
    } catch (e) {
      alert(e.message);
    }
  };

  /**
   * 영화 더보기
   * @param {*} page
   */
  const getMovieMore = async (page = 1, type = "now_playing") => {
    try {
      if (page === 1) movieMoreListLoading.value = true;
      if (page > 1) movieMoreLoading.value = true;
      const response = await useFetch(`/movie/${type}`, "get", {
        page,
        language: "ja",
      });
      movieMoreList.value = [...movieMoreList.value, ...response.data.results];
      movieMoreListLoading.value = false;
      movieMoreListLoading.value = false;
    } catch (e) {
      alert(e.message);
    }
  };

  return {
    movieDiscoverList,
    movieDiscoverListLoading,
    moviePlayingList,
    moviePlayListLoading,
    moviePopularList,
    moviePopularListLoading,
    movieUpComingList,
    movieUpComingListLoading,
    movieTopRatedList,
    movieTopRatedListLoading,
    movieDetailList,
    movieDetailListLoading,
    movieTrailerList,
    movieTrailerListLoading,
    movieCreditList,
    movieCreditListLoading,
    movieMoreList,
    movieMoreLoading,
    movieMoreListLoading,

    getMovieDiscover,
    getMoviePlaying,
    getMoviePopular,
    getMovieUpComing,
    getMovieTopRated,
    getMovieDetail,
    getMovieTrailer,
    getMovieCredits,
    getMovieMore,
  };
});
