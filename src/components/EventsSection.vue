<template>
    <section id="events-section" class="events">
      <!-- Corner Image -->
      <div class="events-image">
        <img :src="imageSrc"  alt="Events Design">
      </div>
  
      <div class="events-content">
        <div v-for="event in events" :key="event.id" class="event-item">
          <div class="event-info">
            <p class="event-location">{{ event.location }}</p>
            <h3 class="event-date">{{ event.date }}</h3>
            <h2 class="event-title">{{ event.title }}</h2>
          </div>
          <span class="event-arrow">→</span>
        </div>
  
        <button class="all-events-btn">{{ $t('seeAllEvents') }}</button>
      </div>
    </section>
  </template>
  
  
  <script>
import eventsData from "@/locales.json";
  
  export default {
    name: "EventsSection",
    data() {
      return {
        events: eventsData[this.$i18n.locale]?.events || [],
        windowWidth: window.innerWidth,
      };
    },
    computed: {
      imageSrc() {
        return this.windowWidth < 992
          ? require("@/assets/events_small.png")
          : require("@/assets/events.png");
      },
    },
    mounted() {
      window.addEventListener("resize", this.updateWidth);
    },
    beforeUnmount() {
      window.removeEventListener("resize", this.updateWidth);
    },
    methods: {
      updateWidth() {
        this.windowWidth = window.innerWidth;
      },
    },
    watch: {
      "$i18n.locale"(newLang) {
        this.events = eventsData[newLang]?.events || [];
      },
    },
  };
  </script>
  
  <style scoped>
  /* Events Section */
  .events {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 60px;
    background: black;
    color: white;
    position: relative;
  }
  
  /* Fixed Image in the Bottom Left */
  .events-image {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 320px; /* Adjust size */
    z-index: 1;
    pointer-events: none; /* Prevents interference */
  }
  
  .events-image img {
    width: 100%;
    height: auto;
  }
  
  /* Event List */
  .events-content {
    margin-left: auto;
    width: 65%;
    padding-top: 100px;
  min-height: 80vh;
  }
  
  .event-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 20px 0;
  }
  
  .event-info {
    flex: 1;
  }
  
  .event-location {
    font-size: 14px;
    color: gray;
  }
  
  .event-date {
    font-size: 20px;
    font-weight: bold;
  }
  
  .event-title {
    font-size: 28px;
    font-weight: bold;
  }
  
  .event-arrow {
    font-size: 24px;
    cursor: pointer;
  }
  
  /* View All Events Button */
  .all-events-btn {
    margin-top: 20px;
    padding: 10px 20px;
    border: 1px solid rgb(255, 255, 255);
    color: white;
    background: transparent;
    cursor: pointer;
    font-size: 16px;
  }
  
  .all-events-btn:hover {
    background: black;
    color: white;
  }
  
  /* Responsive */
  @media (max-width: 992px) {
    .events {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 80px 5% 50px;
  }

  .events-content {
    width: 100%;
  }

  .events-image {
    position: static; /* Remove absolute positioning */
    width: 100%; /* Make it full width */
    margin-top: 40px; /* Add spacing */
  }

  .events-image img {
    max-width: 100%;
    height: auto;
  }
  
    .events-image {
      width: 250px;
    }
  }
  
  @media (max-width: 768px) {
    .events {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 80px 5% 50px;
  }

  .events-content {
    width: 100%;
  }

  .events-image {
    position: static; /* Remove absolute positioning */
    width: 100%; /* Make it full width */
    margin-top: 40px; /* Add spacing */
  }

  .events-image img {
    max-width: 100%;
    height: auto;
  }

    .event-title {
      font-size: 24px;
    }
  
    .event-date {
      font-size: 18px;
    }
  
    .event-arrow {
      font-size: 20px;
    }
  }
  
  @media (max-width: 480px) {
    .events {
      flex-direction: column;
      padding: 60px 5%;
    }
  
    .events-image {
      width: 200px;
    }
  
    .event-title {
      font-size: 20px;
    }
  
    .event-date {
      font-size: 16px;
    }
  }
  </style>
  