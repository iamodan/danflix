<script setup>
import { computed } from "vue";

const props = defineProps({
  movieDetail: Object,
  loading: Boolean,
  credit: Object,
  creditLoading: Boolean,
});

const convertMinutesToHours = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;

  let result = "";
  if (hours > 0) {
    result += `${hours}時間 `;
  }

  if (remainMinutes > 0 || hours === 0) {
    result += `${remainMinutes}分`;
  }

  return result;
};

const director = computed(() => {
  if (props.credit && props.credit.crew && props.credit.crew.length > 0) {
    return props.credit.crew
      .filter((v) => v.job === "Director")
      .map((v) => v.name)[0];
  }
  return null;
});

const casting = computed(() => {
  if (props.credit && props.credit.cast && props.credit.cast.length > 0) {
    return props.credit.cast
      .filter((v) => v.known_for_department === "Acting" && v.order <= 4)
      .map((v) => v.name)
      .join("•");
  }
  return null;
});

const production = computed(() => {
  if (props.movieDetail && props.movieDetail.production_companies.length > 0)
    return props.movieDetail.production_companies.map((v) => v.name).join("•");
});
</script>
<template>
  <!-- {{ props.credit }} -->
  <section class="detail">
    <div v-if="!props.loading" class="detail-wrap">
      <div class="detail-info">
        <h2 class="detail-title">{{ props.movieDetail.title }}</h2>
        <ul class="detail-features">
          <li class="features-item">
            <div
              class="progress-circle"
              :class="[
                `p${Math.floor(props.movieDetail.vote_average * 10)}`,
                {
                  over50: Math.floor(props.movieDetail.vote_average * 10) > 50,
                },
              ]"
            >
              <span
                >{{ Math.floor(props.movieDetail.vote_average * 10) }}%</span
              >
              <div class="left-half-clipper">
                <div class="first50-bar"></div>
                <div class="value-bar"></div>
              </div>
            </div>
          </li>
          <li
            v-for="(genre, index) in props.movieDetail.genres.map(
              (v) => v.name
            )"
            :key="index"
            class="features-item"
          >
            {{ genre }}
          </li>
          <li class="features-item">
            {{ convertMinutesToHours(props.movieDetail.runtime) }}
          </li>
          <!-- <li class="features-item">{{ props.movieDetail.runtime }}</li> -->
        </ul>
        <p class="detail-desc">
          {{ props.movieDetail.overview }}
        </p>
        <ul class="detail-maker">
          <li>
            <strong>監督</strong>
            :
            <span>{{ director }}</span>
          </li>
          <li>
            <strong>出演</strong>
            :
            <span>{{ casting }}</span>
          </li>
          <li>
            <strong>制作</strong>
            :
            <span>{{ production }}</span>
          </li>
        </ul>
      </div>
      <div class="detail-poster">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${props.movieDetail.poster_path}`"
          alt=""
        />
      </div>
    </div>
    <div v-else class="detail-wrap">
      <div class="detail-info">
        <h2 class="detail-title skeleton-list-item ui3"></h2>
        <ul class="detail-features skeleton-list-item ui4"></ul>
        <p class="skeleton-list-item ui4"></p>
        <ul class="detail-maker">
          <li class="skeleton-list-item ui5"></li>
          <li class="skeleton-list-item ui5"></li>
          <li class="skeleton-list-item ui5"></li>
        </ul>
      </div>
      <div class="detail-poster">
        <a href="#" class="skeleton-list-item ui0"></a>
      </div>
    </div>
  </section>
</template>
