// Podcast player for spuntentertainment
document.addEventListener('DOMContentLoaded', () => {
  const audioPlayer = document.getElementById('audio-player');
  const playBtn = document.getElementById('play-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const volumeControl = document.getElementById('volume-control');
  const episodeTitle = document.getElementById('episode-title');
  const episodeDescription = document.getElementById('episode-description');
  const episodeArt = document.getElementById('episode-art');
  const episodesList = document.getElementById('episodes');

  // Sample podcast data - would normally come from an API
  const podcastEpisodes = [
    {
      id: 1,
      title: 'The Future of Entertainment',
      description: 'Exploring emerging trends in digital entertainment',
      audioUrl: 'https://example.com/episodes/1.mp3',
      imageUrl: 'https://example.com/images/1.jpg',
      duration: '45:22'
    },
    {
      id: 2,
      title: 'Interview with Industry Leaders',
      description: 'Conversations with top executives in entertainment',
      audioUrl: 'https://example.com/episodes/2.mp3',
      imageUrl: 'https://example.com/images/2.jpg',
      duration: '38:15'
    },
    {
      id: 3,
      title: 'Behind the Scenes',
      description: 'How your favorite shows are made',
      audioUrl: 'https://example.com/episodes/3.mp3',
      imageUrl: 'https://example.com/images/3.jpg',
      duration: '52:40'
    }
  ];

  // Load episodes into the UI
  function loadEpisodes() {
    episodesList.innerHTML = '';
    podcastEpisodes.forEach(episode => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="episode-item">
          <img src="${episode.imageUrl}" alt="${episode.title}">
          <div>
            <h4>${episode.title}</h4>
            <p>${episode.duration}</p>
            <button class="play-episode" data-id="${episode.id}">Play</button>
          </div>
        </div>
      `;
      episodesList.appendChild(li);
    });

    // Add event listeners to play buttons
    document.querySelectorAll('.play-episode').forEach(btn => {
      btn.addEventListener('click', () => playEpisode(btn.dataset.id));
    });
  }

  // Play selected episode
  function playEpisode(episodeId) {
    const episode = podcastEpisodes.find(ep => ep.id == episodeId);
    if (!episode) return;

    audioPlayer.src = episode.audioUrl;
    episodeTitle.textContent = episode.title;
    episodeDescription.textContent = episode.description;
    episodeArt.src = episode.imageUrl;
    audioPlayer.play();
  }

  // Player controls
  playBtn.addEventListener('click', () => audioPlayer.play());
  pauseBtn.addEventListener('click', () => audioPlayer.pause());
  volumeControl.addEventListener('input', () => {
    audioPlayer.volume = volumeControl.value;
  });

  // Initialize
  loadEpisodes();
});
