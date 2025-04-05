document.addEventListener('DOMContentLoaded', () => {
    const celebrateBtn = document.getElementById('celebrateBtn');
    const title = document.querySelector('.title');
    const subtitle = document.querySelector('.subtitle');
    const birthdaySong = document.getElementById('birthdaySong');
    const toggleMusic = document.getElementById('toggleMusic');
    let isMusicPlaying = false;

    // Function to play music
    function playMusic() {
        if (!isMusicPlaying) {
            // Set volume to maximum
            birthdaySong.volume = 1.0;
            
            // Try to play immediately
            const playPromise = birthdaySong.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isMusicPlaying = true;
                    toggleMusic.textContent = '🔊';
                    toggleMusic.classList.remove('muted');
                }).catch(error => {
                    console.log('Auto-play failed:', error);
                    // If autoplay fails, show a message to click anywhere to play
                    const playMessage = document.createElement('div');
                    playMessage.style.position = 'fixed';
                    playMessage.style.top = '20px';
                    playMessage.style.left = '50%';
                    playMessage.style.transform = 'translateX(-50%)';
                    playMessage.style.background = 'rgba(255, 255, 255, 0.9)';
                    playMessage.style.padding = '10px 20px';
                    playMessage.style.borderRadius = '20px';
                    playMessage.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                    playMessage.textContent = 'Click anywhere to play music 🎵';
                    document.body.appendChild(playMessage);
                    
                    // Add click event to document to start playing
                    document.addEventListener('click', function startMusic() {
                        playMusic();
                        document.removeEventListener('click', startMusic);
                        playMessage.remove();
                    }, { once: true });
                });
            }
        }
    }

    // Function to toggle music
    function toggleMusicPlayback() {
        if (isMusicPlaying) {
            birthdaySong.pause();
            toggleMusic.textContent = '🔈';
            toggleMusic.classList.add('muted');
        } else {
            birthdaySong.play();
            toggleMusic.textContent = '🔊';
            toggleMusic.classList.remove('muted');
        }
        isMusicPlaying = !isMusicPlaying;
    }

    // Add click event listener to music toggle button
    toggleMusic.addEventListener('click', toggleMusicPlayback);

    // Try to play music immediately when page loads
    playMusic();

    // Initial confetti burst
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, 2000);

    // Celebrate button click handler
    celebrateBtn.addEventListener('click', () => {
        // Create multiple confetti bursts
        const end = Date.now() + 3000;
        const colors = ['#ff6b6b', '#ff9a9e', '#fad0c4', '#ffd1ff'];

        (function frame() {
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        // Add bounce animation to title and subtitle
        title.style.animation = 'none';
        subtitle.style.animation = 'none';
        setTimeout(() => {
            title.style.animation = 'bounce 0.5s ease';
            subtitle.style.animation = 'bounce 0.5s ease 0.2s';
        }, 10);
    });

    // Add floating hearts animation
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.opacity = Math.random();
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.innerHTML = '❤️';
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    // Create hearts periodically
    setInterval(createHeart, 300);

    // Add keyframe animation for hearts
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        
        .heart {
            position: fixed;
            top: -10vh;
            animation: fall linear forwards;
            z-index: 1000;
        }

        @keyframes fall {
            to {
                transform: translateY(100vh);
            }
        }
    `;
    document.head.appendChild(style);
}); 