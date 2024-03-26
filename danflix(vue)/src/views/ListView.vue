<script setup>
import ListMovie from "@/components/list/ListMovie.vue";
import { onBeforeMount, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useMovieStore } from "@/stores/movie";
import { storeToRefs } from "pinia";

const route = useRoute();
const type = route.params.type;
const movieStore = useMovieStore();
const { movieMoreList, movieMoreListLoading, movieMoreLoading } =
  storeToRefs(movieStore);
let page = 1;
let debounceTimer = null;
const onScroll = () => {
  if (debounceTimer) clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    // console.log(window.scrollY);
    const nearBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.offsetHeight;
    if (nearBottom) {
      console.log("bottom 접근!!");
      movieStore.getMovieMore(++page, type);
    }
  }, 250);
};

onBeforeMount(() => {
  movieStore.getMovieMore(page, type);
  // console.log(type);

  window.addEventListener("scroll", onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>
<template>
  <ListMovie
    :movies="movieMoreList"
    :loading="movieMoreListLoading"
    :moreLoading="movieMoreLoading"
  />
</template>
