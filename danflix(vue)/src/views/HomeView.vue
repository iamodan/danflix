<script setup>
import { useMovieStore } from "@/stores/movie";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import MainBanner from "@/components/main/MainBanner.vue";
import MainMovie from "@/components/main/MainMovie.vue";
const movieStore = useMovieStore();
const {
  moviePlayListLoading,
  moviePlayingList,
  moviePopularList,
  moviePopularListLoading,
  movieUpComingList,
  movieUpComingListLoading,
  movieTopRatedList,
  movieTopRatedListLoading,
} = storeToRefs(movieStore);
onBeforeMount(() => {
  movieStore.getMoviePlaying();
  movieStore.getMoviePopular();
  movieStore.getMovieUpComing();
  movieStore.getMovieTopRated();
});
</script>
<template>
  <!-- 하나의 컴포넌트를 사용하여 여러개의 UI를 사용가능 -->
  <MainBanner
    :movies="moviePopularList.filter((v) => v.overview !== '')"
    :loading="moviePopularListLoading"
  />
  <MainMovie
    sub-title="Now Moving"
    title="上映中作品"
    type="now_playing"
    :movies="moviePlayingList"
    :loading="moviePlayListLoading"
  />
  <MainMovie
    sub-title="Now Popular"
    title="人気映画"
    type="popular"
    :movies="moviePopularList"
    :loading="moviePopularListLoading"
  />
  <MainMovie
    sub-title="Now Popular"
    title="公開予定作品"
    type="upcoming"
    :movies="movieUpComingList"
    :loading="movieUpComingListLoading"
  />
  <MainMovie
    sub-title="Top Rated"
    title="評価の高い映画"
    type="top_rated"
    :movies="movieTopRatedList"
    :loading="movieTopRatedListLoading"
  />
</template>
