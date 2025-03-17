<template>
    <div class="music-container">
      <div class="music-header">
        <button @click="$router.go(-1)" class="back-button">←</button>
        <h1>THE SHOW</h1>
        <h2>CHOIRCHESTRA</h2>
      </div>
  
      <div class="tracklist">
        <div v-for="(song, index) in songs" :key="index" class="track-item" @click="playSong(index)">
          <img src="@/assets/theshow.jpeg" alt="Album Art" class="track-image" />
          <div class="track-info">
            <h3>{{ song.title }}</h3>
            <p>{{ song.author }}</p>
          </div>
          <span class="track-duration">{{ formatTime(song.duration) }}</span>
        </div>
      </div>
  
      <div class="music-player">
        <div class="player-info">
          <img src="@/assets/theshow.jpeg" alt="Cover" class="player-image" />
          <div>
            <h3>{{ currentSong.title }}</h3>
            <p>{{ currentSong.author }}</p>
          </div>
        </div>

        <!-- Audio player -->
        <audio ref="audio" @timeupdate="updateTime" @ended="nextSong">
          <source :src="currentSong.src" type="audio/mp3" />
        </audio>

        <div class="player-controls">
          <img src="@/assets/prev.png" alt="Previous" @click="prevSong" />
          <img :src="isPlaying ? require('@/assets/pause.png') : require('@/assets/play.png')" alt="Play/Pause" @click="togglePlay" />
          <img src="@/assets/next.png" alt="Next" @click="nextSong" />
          <img src="@/assets/repeat.png" alt="Repeat" />
          <img src="@/assets/shuffle.png" alt="Shuffle" />
        </div>

        <div class="progress-container">
          <span>{{ formatTime(currentTime) }}</span>
          <input type="range" v-model="progress" @input="seekAudio" />
          <span>{{ formatTime(currentSong.duration) }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        songs: [
          { title: "Rock Around the Clock", author: "Bill Haley", src: "/mp3/Rock_around.mp3", cover: "@/assets/theshow.jpeg", duration: 133 },
          { title: "Sarzhailau", author: "Nurgisa Tilendiyev", src: "/mp3/Sarzhailau.mp3", cover: "/covers/sarzhailau.jpg", duration: 201 },
          { title: "Aigyr", author: "ARO", src: "/mp3/Aigyr.mp3", cover: "/covers/aigyr.jpg", duration: 214 },
          { title: "Feelin' good", author: "Anthony Newley", src: "/mp3/Feeling_Good.mp3", cover: "/covers/feeling_good.jpg", duration: 292 },
          { title: "Heathens X Stranger Things", author: "Twenty One Pilots, Kyle Dixon", src: "/mp3/Heathens_Stranger_Things.mp3", cover: "/covers/heathens.jpg", duration: 239 },
          { title: "Qosh Bol", author: "Moldanazar", src: "/mp3/Qosh_bol.mp3", cover: "/covers/Qosh_bol.jpg", duration: 190 },
          { title: "Tuimedaq", author: "Kunzharyq", src: "/mp3/Tuimedaq.mp3", cover: "/covers/Tuimedaq.jpg", duration: 240 }
        ],
        currentSongIndex: 0,
        isPlaying: false,
        progress: 0,
        currentTime: 0
      };
    },
    computed: {
      currentSong() {
        return this.songs[this.currentSongIndex];
      }
    },
    methods: {
      playSong(index) {
        this.currentSongIndex = index;
        this.playAudio();
      },
      playAudio() {
        this.$nextTick(() => {  // Wait until DOM is updated
          const audio = this.$refs.audio;  // Get the reference to audio element
          if (!audio) {
            console.error("Audio element not found.");
            return;
          }
          audio.src = this.currentSong.src;  // Set the source
          audio.load();  // Load the new audio source
          audio.play()  // Play the audio
            .then(() => {
              this.isPlaying = true;  // Set the state to playing
            })
            .catch(err => {
              console.error("Error playing audio:", err);
            });
        });
      },
      togglePlay() {
        this.$nextTick(() => {
          const audio = this.$refs.audio;
          if (!audio) {
            console.error("Audio element is not found.");
            return;
          }
          if (audio.paused) {
            audio.play();
            this.isPlaying = true;
          } else {
            audio.pause();
            this.isPlaying = false;
          }
        });
      },
      prevSong() {
        this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
        this.playAudio();
      },
      nextSong() {
        this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
        this.playAudio();
      },
      updateTime() {
        this.currentTime = this.$refs.audio.currentTime;
        this.progress = (this.currentTime / this.currentSong.duration) * 100;
      },
      seekAudio(event) {
        const newTime = (event.target.value / 100) * this.currentSong.duration;
        this.$refs.audio.currentTime = newTime;
        this.currentTime = newTime;
      },
      formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
        return `${min}:${sec}`;
      }
    }
  };
  </script>
  
  <style scoped>
  .music-container {
    background: black;
    color: white;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .music-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .music-header h1 {
    font-size: 36px;
  }
  
  .music-header h2 {
    font-size: 20px;
  }
  
  .tracklist {
    width: 90%;
    max-width: 600px;
    overflow-y: auto;
  }
  
  .track-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid white;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .track-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .track-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  
  .track-info {
    flex: 1;
    margin-left: 10px;
  }
  
  .track-duration {
    font-size: 14px;
    color: gray;
  }
  
  .music-player {
    bottom: 0;
    left: 0;
    width: 100%;

    background: white;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 2px solid black;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
    color: black;
  }
  
  .player-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .player-info {
    display: flex;
    align-items: center;
    flex: 1;
  }
  
  .player-controls {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .player-controls img {
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: opacity 0.2s ease-in-out;
  }
  
  .player-controls img:hover {
      opacity: 0.7;
  }
    

  .player-controls img:hover {
    opacity: 0.7;
}

/* Progress Bar */
.progress-container {
    display: flex;
    align-items: center;
    flex: 2;
    margin-left: 20px;
}

  input[type="range"] {
    width: 100%;
    height: 4px;
    background: #ccc;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 10px;
    appearance: none;
  }

/* Time Info */
  .time-info {
    display: flex;
    gap: 10px;
    font-size: 14px;
  }
  </style>
  