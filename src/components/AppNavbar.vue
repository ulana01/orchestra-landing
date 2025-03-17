<template>
    <nav class="navbar">
      <!-- Logo -->
      <div class="logo">
        <img src="@/assets/logo.png" alt="Orchestra Logo">
      </div>
      <ul class = "nav-links">
        <li @click="scrollToEvents">{{ $t('Events') }}</li>
        <li>{{ $t('Orchestra') }}</li>
        <li>{{ $t('Community') }}</li>
        <li>{{ $t('Support Us') }}</li>
        <li>{{ $t('News') }}</li>
      </ul>

      

      <!-- Language Selection -->
      <div class="language-selector">
        <span
          v-for="lang in ['ru', 'kz', 'en']"
          :key="lang"
          :class="{ active: $i18n.locale === lang }"
          @click="$i18n.locale = lang"
        >
          {{ lang.toUpperCase() }}
        </span>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "AppNavbar",
    data(){
      return {
        isBlackNavbar: false,
      };
    },
    methods: {
      scrollToEvents(){
        const eventsSection = document.getElementById("events-section");
        if (eventsSection) {
          eventsSection.scrollIntoView({behavior: "smooth"});
        }
      },
      handleScroll() {
        this.isBlackNavbar = window.scrollY > window.innerHeight - 100;
      },
    },
    mounted(){
      window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    },
  };
  </script>
  