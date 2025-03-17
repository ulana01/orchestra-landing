<template>
    <section class="hero">
      <div class="hero-content">
        <h1>{{ $t('title') }}</h1>
        <p>{{ $t('subtitle') }}</p>
        <button class="event-btn" @click="scrollToEvents">{{ $t('viewSchedule') }}
          <img src="@/assets/arrow-down.png" alt="arrow down" class="arrow" />
        </button>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "HeroSection"
  };
  </script>
  