(function () {
  'use strict';

  var cover = document.getElementById('cover');
  var invitation = document.getElementById('invitation');
  var btnOpen = document.getElementById('btnOpen');
  var btnMusic = document.getElementById('btnMusic');
  var bgMusic = document.getElementById('bgMusic');

  /* ---------------------------------------------------------
     Buka Undangan -> tampilkan halaman 2 tanpa reload,
     mulai dari posisi paling atas, mulai musik.
  --------------------------------------------------------- */
  function openInvitation() {
    if (!invitation.hidden) return;

    invitation.hidden = false;
    cover.style.display = 'none';

    // Pastikan mulai dari paling atas halaman 2
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Tampilkan tombol musik & mulai putar (dipicu oleh gesture user ini)
    btnMusic.hidden = false;
    playMusic();

    // Aktifkan reveal setelah halaman ditampilkan
    initReveal();
  }

  btnOpen.addEventListener('click', openInvitation);

  /* ---------------------------------------------------------
     Kontrol musik: play / pause
  --------------------------------------------------------- */
  function playMusic() {
    var p = bgMusic.play();
    if (p && typeof p.then === 'function') {
      p.then(function () {
        setMusicState(true);
      }).catch(function () {
        // Autoplay diblokir; biarkan pengguna menekan tombol musik
        setMusicState(false);
      });
    } else {
      setMusicState(true);
    }
  }

  function pauseMusic() {
    bgMusic.pause();
    setMusicState(false);
  }

  function setMusicState(isPlaying) {
    btnMusic.classList.toggle('is-playing', isPlaying);
    btnMusic.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
  }

  btnMusic.addEventListener('click', function () {
    if (bgMusic.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  });

  /* ---------------------------------------------------------
     Scroll reveal untuk section & card
  --------------------------------------------------------- */
  var revealInitialized = false;

  function initReveal() {
    if (revealInitialized) return;
    revealInitialized = true;

    var items = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -2% 0px' });

    items.forEach(function (el) { observer.observe(el); });
  }
})();
