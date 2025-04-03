import './style.css';

const audio = new Audio();
const player = {
  isPlaying: false,
  currentEpisode: null,
  episodes: [
    {
      title: 'spuntentertainment episode one',
      duration: '4:54',
      url: 'https://buzz-worthy.spuntentertainment.buzz/Spuntentertainment_%20A%20Disclaimer.wav',
      artwork: './public/spunt-cover-1.png',
      description: 'spuntentertainment episode one should really be considered as more like a trailer or a teaser.  This is sort of like the first thing that came out so it is what is is. "I love it, I hate it, it is equal parts of aweful and awesome at the same time. I gotta get more.." --HashbrownnKazang'
    }
  ]
};

// DOM Elements
const playPauseBtn = document.querySelector('.play-pause');
const volumeSlider = document.querySelector('.volume-slider');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');
const episodesContainer = document.querySelector('.episodes');

function initPlayer() {
  renderEpisodes();
  setupEventListeners();
  updatePlayerState();
}

function renderEpisodes() {
  episodesContainer.innerHTML = player.episodes.map(episode => `
    <div class="episode" data-url="${episode.url}">
      <h3>${episode.title}</h3>
      <p>${episode.duration} • ${episode.description}</p>
    </div>
  `).join('');
}

function setupEventListeners() {
  // Play/Pause control
  playPauseBtn.addEventListener('click', togglePlay);
  
  // Volume control
  volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
  });

  // Progress bar seeking
  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const seekTime = (e.clientX - rect.left) / rect.width * audio.duration;
    audio.currentTime = seekTime;
  });

  // Episode selection
  episodesContainer.addEventListener('click', (e) => {
    const episodeEl = e.target.closest('.episode');
    if (episodeEl) {
      const episodeUrl = episodeEl.dataset.url;
      playEpisode(episodeUrl);
    }
  });

  // Audio time updates
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('loadedmetadata', updateDuration);
}

function togglePlay() {
  player.isPlaying = !player.isPlaying;
  player.isPlaying ? audio.play() : audio.pause();
  updatePlayerState();
}

function playEpisode(url) {
  if (audio.src !== url) {
    audio.src = url;
    audio.load();
  }
  player.isPlaying = true;
  audio.play();
  updatePlayerState();
}

function updatePlayerState() {
  playPauseBtn.textContent = player.isPlaying ? '⏸' : '▶';
}

function updateProgress() {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.setProperty('--progress', `${progress}%`);
  currentTimeEl.textContent = formatTime(audio.currentTime);
}

function updateDuration() {
  durationEl.textContent = formatTime(audio.duration);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Initialize the player when loaded
window.addEventListener('load', initPlayer);
