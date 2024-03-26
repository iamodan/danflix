<script setup>
import { useMovieStore } from "@/stores/movie";
import { storeToRefs } from "pinia";
import { onBeforeMount, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { watch } from "vue";
import { computed } from "vue";
import DetailTrailer from "@/components/detail/DetailTrailer.vue";
import DetailInfo from "@/components/detail/DetailInfo.vue";
import MainMovie from "@/components/main/MainMovie.vue";

const route = useRoute();
const movieStore = useMovieStore();
const {
  movieDiscoverList,
  movieDiscoverListLoading,
  movieDetailList,
  movieDetailListLoading,
  movieTrailerList,
  movieTrailerListLoading,
  movieCreditList,
  movieCreditListLoading,
} = storeToRefs(movieStore);

onBeforeMount(() => {
  const id = route.params.id;
  movieStore.getMovieTrailer(id);
  movieStore.getMovieDetail(id);
  movieStore.getMovieCredits(id);
});

const genre = computed(() => {
  return movieDetailList.value.genres?.map((v) => v.id).join(",") || "";
});

watch(genre, (newValue) => {
  // console.log(newValue.map((v) => v.id).join(","));
  movieStore.getMovieDiscover(1, newValue);
});

const detailList = computed(() => {
  return movieDiscoverList.value.filter(
    (v) => v.id !== Number(route.params.id)
  );
});

onBeforeUnmount(() => {
  movieDetailList.value = [];
  movieDiscoverListLoading.value = true;
});
</script>
<template>
  <DetailTrailer
    :movie-detail="movieDetailList"
    :movie-trailer="movieTrailerList"
    :loading="movieTrailerListLoading"
  />
  <DetailInfo
    :movie-detail="movieDetailList"
    :loading="movieDetailListLoading"
    :credit="movieCreditList"
    :credit-loading="movieCreditListLoading"
  />
  <MainMovie
    v-if="detailList.length > 0"
    sub-title="Relative Movies"
    title="関連作品"
    :type="relative"
    :movies="detailList"
    :loading="movieDiscoverListLoading"
  />
</template>
