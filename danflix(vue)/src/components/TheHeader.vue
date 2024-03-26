<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
</script>
<template>
  <header class="header">
    <a href="/"><h1 class="header__logo" style="color: red">DANFlix</h1></a>
    <ul class="header__navi">
      <li>
        <RouterLink to="/movie/now_playing">上映中作品</RouterLink>
      </li>
      <li>
        <RouterLink to="/movie/popular">人気作品</RouterLink>
      </li>
      <li>
        <RouterLink to="/movie/upcoming">公開予定</RouterLink>
      </li>
    </ul>
    <!-- <div class="header-search">
      <input
        type="text"
        class="header-search__input"
        placeholder="タイトルで探してください。"
      />
      <span class="material-symbols-outlined icon"> search </span>
    </div> -->
  </header>
  <nav class="navigator">
    <ul class="navigator-list">
      <li class="navigator-list__item" @click="router.push('/')">
        <img
          src="@/assets/icons/home.png"
          alt=""
          class="navigator-list__icon"
        />
        <strong class="navigator-list__txt">メイン</strong>
      </li>
      <li
        class="navigator-list__item"
        @click="router.push('/movie/now_playing')"
      >
        <img
          src="@/assets/icons/live.png"
          alt=""
          class="navigator-list__icon"
        />
        <strong class="navigator-list__txt">上映中作品</strong>
      </li>
      <li class="navigator-list__item" @click="router.push('/movie/popular')">
        <img
          src="@/assets/icons/popluar.png"
          alt=""
          class="navigator-list__icon"
        />
        <strong class="navigator-list__txt">人気作品</strong>
      </li>

      <li class="navigator-list__item" @click="router.push('/movie/upcoming')">
        <img
          src="@/assets/icons/video.png"
          alt=""
          class="navigator-list__icon"
        />
        <strong class="navigator-list__txt">公開予定</strong>
      </li>
      <!-- <li class="navigator-list__item">
        <img
          src="@/assets/icons/search.png"
          alt=""
          class="navigator-list__icon"
        />
        <strong class="navigator-list__txt">search</strong>
      </li> -->
    </ul>
  </nav>
  <section v-if="searchFlag" class="search-box">
    <div class="search-input">
      <div class="search-wrap">
        <button>x</button>
        <input
          type="text"
          placeholder="映画のタイトルを入力してください。"
          autocomplete="off"
        />
        <span class="material-symbols-outlined icon"> search </span>
      </div>
    </div>
  </section>
</template>
