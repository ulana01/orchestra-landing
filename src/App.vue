<template>
  <div>
    <AppNavbar />
    <HeroSection />
    <EventsSection />
    <TheShow />
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';
import HeroSection from './components/HeroSection.vue';
import EventsSection from './components/EventsSection.vue';
import TheShow from './components/TheShow.vue';

export default {
  components: {
    AppNavbar,
    HeroSection,
    EventsSection,
    TheShow,
  }
};
</script>
