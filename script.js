let currentSection = 1;
const totalSections = 4;

// Audio setup
const backgroundMusic = document.getElementById('backgroundMusic');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    setupGiftBox();
    startCountdown();
});

// Create floating hearts animation
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heartSymbols = ['💖', '💕', '💗', '💘', '💝', '💓', '💞'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 5000);
    }, 1000);
}

// Setup gift box click event
function setupGiftBox() {
    const giftBox = document.getElementById('giftBox');
    
    giftBox.addEventListener('click', openGiftBox);
}

// Open gift box animation and start surprise
function openGiftBox() {
    const giftBox = document.getElementById('giftBox');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const surpriseContent = document.getElementById('surpriseContent');

    // Add opening animation class
    giftBox.classList.add('opening');

    // Play background music
    playBackgroundMusic();

    // Wait for animation then show surprise content
    setTimeout(() => {
        welcomeScreen.classList.remove('active');
        surpriseContent.classList.add('active');
        showSection(1);
    }, 1000);
}

// Play background music
function playBackgroundMusic() {
    try {
        backgroundMusic.volume = 0.8;
        backgroundMusic.play().catch(e => {
            console.log('Audio play failed:', e);
            // Fallback: create a simple beep sound using Web Audio API
            createRomanticTone();
        });
    } catch (e) {
        console.log('Audio not supported');
        createRomanticTone();
    }
}

// Create a romantic tone using Web Audio API (fallback)
function createRomanticTone() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
        
        // Play a sequence of romantic notes
        setTimeout(() => {
            const osc2 = audioContext.createOscillator();
            const gain2 = audioContext.createGain();
            osc2.connect(gain2);
            gain2.connect(audioContext.destination);
            osc2.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5
            gain2.gain.setValueAtTime(0.1, audioContext.currentTime);
            osc2.start();
            osc2.stop(audioContext.currentTime + 0.5);
        }, 600);
        
        setTimeout(() => {
            const osc3 = audioContext.createOscillator();
            const gain3 = audioContext.createGain();
            osc3.connect(gain3);
            gain3.connect(audioContext.destination);
            osc3.frequency.setValueAtTime(783.99, audioContext.currentTime); // G5
            gain3.gain.setValueAtTime(0.1, audioContext.currentTime);
            osc3.start();
            osc3.stop(audioContext.currentTime + 1);
        }, 1200);
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

// Show specific section
function showSection(sectionNumber) {
    // Hide all sections
    for (let i = 1; i <= totalSections; i++) {
        document.getElementById(`section${i}`).classList.remove('active');
    }
    
    // Show current section
    document.getElementById(`section${sectionNumber}`).classList.add('active');
    currentSection = sectionNumber;
}

// Go to next section
function nextSection() {
    if (currentSection < totalSections) {
        showSection(currentSection + 1);
    }
}

// Restart the experience
function restart() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const surpriseContent = document.getElementById('surpriseContent');
    const giftBox = document.getElementById('giftBox');
    
    // Reset states
    surpriseContent.classList.remove('active');
    giftBox.classList.remove('opening');
    welcomeScreen.classList.add('active');
    currentSection = 1;
    
    // Stop music
    try {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    } catch (e) {
        console.log('Audio control failed');
    }
    
    // Reset gift box click event
    setTimeout(() => {
        setupGiftBox();
    }, 500);
}

// Add some interactive effects
document.addEventListener('click', function(e) {
    // Create click effect
    if (e.target.classList.contains('memory-card') || 
        e.target.classList.contains('next-btn') || 
        e.target.classList.contains('restart-btn')) {
        createClickEffect(e.clientX, e.clientY);
    }

    // Open lightbox for each button with different images
    if (e.target.classList.contains('open-popups')) {
        const lightboxId = e.target.getAttribute('data-lightbox');
        openLightbox(lightboxId);
    }
});

// Create click effect animation
function createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.style.position = 'fixed';
    effect.style.left = x + 'px';
    effect.style.top = y + 'px';
    effect.style.width = '20px';
    effect.style.height = '20px';
    effect.style.background = 'radial-gradient(circle, #ff6b6b, transparent)';
    effect.style.borderRadius = '50%';
    effect.style.pointerEvents = 'none';
    effect.style.zIndex = '1000';
    effect.style.animation = 'clickRipple 0.6s ease-out forwards';
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        document.body.removeChild(effect);
    }, 600);
}

// Add CSS for click effect
const style = document.createElement('style');
style.textContent = `
    @keyframes clickRipple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add some romantic messages that appear randomly
const romanticMessages = [
    "Kamu adalah segalanya bagiku ❤️",
    "Setiap hari bersamamu adalah keajaiban 💖",
    "Cinta kita akan abadi selamanya 💕",
    "Terima kasih sudah hadir dalam hidupku 💗",
    "Kamu membuatku menjadi orang yang lebih baik 💘"
];

// Show random romantic message
function showRandomMessage() {
    const message = romanticMessages[Math.floor(Math.random() * romanticMessages.length)];
    
    const messageDiv = document.createElement('div');
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.background = 'rgba(255, 182, 193, 0.9)';
    messageDiv.style.color = '#444';
    messageDiv.style.padding = '10px 20px';
    messageDiv.style.borderRadius = '20px';
    messageDiv.style.fontSize = '14px';
    messageDiv.style.fontWeight = '500';
    messageDiv.style.zIndex = '1000';
    messageDiv.style.animation = 'messageSlideIn 0.5s ease-out';
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'messageSlideOut 0.5s ease-out forwards';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 500);
    }, 3000);
}

// Add CSS for message animations
const messageStyle = document.createElement('style');
messageStyle.textContent = `
    @keyframes messageSlideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes messageSlideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(messageStyle);

// Show random messages periodically after opening the box
let messageInterval;

function startRandomMessages() {
    messageInterval = setInterval(() => {
        if (document.getElementById('surpriseContent').classList.contains('active')) {
            showRandomMessage();
        }
    }, 8000);
}

// Start random messages when surprise content is shown
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.target.classList.contains('surprise-content') && 
            mutation.target.classList.contains('active')) {
            setTimeout(startRandomMessages, 2000);
        }
    });
});

observer.observe(document.getElementById('surpriseContent'), {
    attributes: true,
    attributeFilter: ['class']
});

// Countdown timer functions
function getTimeRemaining(targetDate) {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const difference = target - now;

    if (difference <= 0) {
        return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { total: difference, days, hours, minutes, seconds };
}

function updateCountdown() {
    const currentYear = new Date().getFullYear();
    const targetDate = new Date(currentYear, 8, 8, 0, 0, 0); // September 8, 00:00

    // If current date is after September 8, set to next year
    if (new Date() > targetDate) {
        targetDate.setFullYear(currentYear + 1);
    }

    const timeRemaining = getTimeRemaining(targetDate);
    const countdownElement = document.getElementById('countdownTimer');

    if (timeRemaining.total <= 0) {
        countdownElement.innerHTML = '<div class="countdown-finished">Waktunya tiba! Kamu bisa membuka kotak hadiah sekarang! 🎉</div>';
        countdownElement.classList.add('finished');
        return true; // Countdown finished
    } else {
        countdownElement.innerHTML = `
            <div class="countdown-title">Tunggu sebentar ya sayang... ⏰</div>
            <div class="countdown-display">
                <div class="countdown-item">
                    <span class="countdown-number">${timeRemaining.days}</span>
                    <span class="countdown-label">Hari</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${timeRemaining.hours}</span>
                    <span class="countdown-label">Jam</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${timeRemaining.minutes}</span>
                    <span class="countdown-label">Menit</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${timeRemaining.seconds}</span>
                    <span class="countdown-label">Detik</span>
                </div>
            </div>
            <div class="countdown-message">Kotak hadiah akan bisa dibuka pada 8 September pukul 00:00 ❤️</div>
        `;
        countdownElement.classList.remove('finished');
        return false; // Countdown still running
    }
}

function startCountdown() {
    updateCountdown();
    const countdownInterval = setInterval(() => {
        if (updateCountdown()) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

// Modify openGiftBox to check countdown (countdown script)
function openGiftBox() {
    const currentYear = new Date().getFullYear();
    let targetDate = new Date(currentYear, 8, 6, 9, 4, 0); // September 8, 00:00

    // If current date is after September 8, set to next year
    if (new Date() > targetDate) {
        targetDate.setFullYear(currentYear + 1);
    }

    const timeRemaining = getTimeRemaining(targetDate);

    if (timeRemaining.total > 0) {
        // Show message that it's not time yet
        showWaitingMessage();
        return;
    }

    // Proceed with opening the box
    const giftBox = document.getElementById('giftBox');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const surpriseContent = document.getElementById('surpriseContent');

    // Add opening animation class
    giftBox.classList.add('opening');

    // Play background music
    playBackgroundMusic();

    // Wait for animation then show surprise content
    setTimeout(() => {
        welcomeScreen.classList.remove('active');
        surpriseContent.classList.add('active');
        showSection(1);
    }, 1000);
}




function showWaitingMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.background = 'rgba(255, 255, 255, 0.95)';
    messageDiv.style.color = '#e74c3c';
    messageDiv.style.padding = '30px 40px';
    messageDiv.style.borderRadius = '20px';
    messageDiv.style.fontSize = '18px';
    messageDiv.style.fontWeight = '600';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.zIndex = '2000';
    messageDiv.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    messageDiv.style.border = '3px solid #e74c3c';
    messageDiv.innerHTML = `
        <div style="font-size: 24px; margin-bottom: 10px;">⏳</div>
        <div>Belum waktunya sayang...</div>
        <div style="font-size: 14px; margin-top: 10px; color: #666;">Tunggu sampai 8 September pukul 00:00 ya! ❤️</div>
    `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 4000);
}

// Lightbox functionality
const lightboxImages = {
    1: [
        'https://media.discordapp.net/attachments/1271387705418186862/1355043122718969906/IMG_20250326_212421.jpg?ex=68bc67ff&is=68bb167f&hm=99141a04a827ddcf01e7e6874452b199fcb61048e8b0e4176969100e2d4c362a&=&format=webp&width=914&height=686',
        'https://media.discordapp.net/attachments/1271387705418186862/1355043123209830500/IMG_20250326_212413.jpg?ex=68bc6800&is=68bb1680&hm=696543eedc1d3d5ca0b8e493e20bf6ba283f6bf10ca56612054a4175e488f4c8&=&format=webp&width=914&height=686',
        'https://media.discordapp.net/attachments/1271387705418186862/1355043124380041236/IMG_20250326_212428.jpg?ex=68bc6800&is=68bb1680&hm=a5b2f3f50f715bd4ae533694a2ec9414b114cbd5c546e8fb5be55c852823d41b&=&format=webp&width=914&height=686',
        'https://media.discordapp.net/attachments/1271387705418186862/1355043123771871322/IMG_20250326_212408.jpg?ex=68bc6800&is=68bb1680&hm=c266f5237e8072c10e51ad08e67f6cf439f7861292d7415e0d5fdb881302d059&=&format=webp&width=914&height=686',
        'https://media.discordapp.net/attachments/1271387705418186862/1355043125046804593/IMG_20250326_201746.jpg?ex=68bc6800&is=68bb1680&hm=34fd8e77f65c8ff54d54b29ba12fea006e5cd9f53dccfe7349190947bf00bc80&=&format=webp&width=299&height=685',
        'https://media.discordapp.net/attachments/1271387705418186862/1355043125671759932/IMG_20250326_202802.jpg?ex=68bc6800&is=68bb1680&hm=8dbca7231feef775b1acf6d43c5d0c64c7addc230a41164a14edcb06a80907db&=&format=webp&width=299&height=685'
    ],
    2: [
        'https://cdn.discordapp.com/attachments/1040305696341753898/1413692168001945670/iloveyou-message.jpg?ex=68bcdaed&is=68bb896d&hm=82984a1c6625a20f91739c612ad75a0974e622ac8ea7eee19b794d94ee055a56&'
    ],
    3: [
        'https://cdn.discordapp.com/attachments/1271387705418186862/1355042327454027837/IMG_20250327_142513.jpg?ex=68bc6742&is=68bb15c2&hm=e845fc51e2aacecf6bf4c480bcdd01a946196bead568b01c93b4589875f7264c&',
        'https://cdn.discordapp.com/attachments/1271387705418186862/1355042326346731611/IMG_20250327_145535.jpg?ex=68bc6742&is=68bb15c2&hm=e428e2f35c8b06293933122b8a47f57c3aafe995e02a3406dc373cf3fe0fdb67&',
        'https://cdn.discordapp.com/attachments/1271387705418186862/1355042326946512970/IMG_20250327_145445.jpg?ex=68bc6742&is=68bb15c2&hm=43e95fa268850ebea76caf092dcb5a5bdfe3c937c2a480b71a1d86bcd06e3622&',
        'https://via.placeholder.com/800x600/fec8d8/000000?text=Vacation+Photo+4'
    ],
    4: [
        'https://cdn.discordapp.com/attachments/1271387705418186862/1355041399279718561/IMG_20250328_084105.jpg?ex=68bc6665&is=68bb14e5&hm=c1f361b246d865b43ee0c50eae52a8e8dd5a40d103d55fb0b9500eb9127d657b&',
        'https://cdn.discordapp.com/attachments/1271387705418186862/1355041397182566490/IMG_20250328_084135.jpg?ex=68bc6664&is=68bb14e4&hm=a085f53a375d216350cd66b5ad3821c860065de7cde6f5f3ec741e523ed8c63d&',
        'https://cdn.discordapp.com/attachments/1271387705418186862/1355041395999506594/IMG_20250328_084158.jpg?ex=68bc6664&is=68bb14e4&hm=543497232a7e59f38d93f4f74a9110af1a97ca92bf2157e67fd73d91a69f0bbf&',
        'https://cdn.discordapp.com/attachments/1271387705418186862/1355041395286605874/IMG_20250328_084202.jpg?ex=68bc6664&is=68bb14e4&hm=1bc6032726ebd3a7f7cf41fe7532fe9f142b1dff4763dd803efe4f0969bc9ff2&',
        'https://cdn.discordapp.com/attachments/1271387705418186862/1355041953946927174/IMG_20250328_084010.jpg?ex=68bc66e9&is=68bb1569&hm=2e176146e2c54b092ca39aca80b87d16091164ae5be8a11ab39ea7e31ec2a9ce&',
        'https://cdn.discordapp.com/attachments/1271387705418186862/1355041956761436190/IMG_20250328_084018.jpg?ex=68bc66e9&is=68bb1569&hm=e9449b35b9d7424e333440fe7541baa15ded94ebe3402c846920675b4846eea2&',
        'https://cdn.discordapp.com/attachments/1271387705418186862/1355041953946927174/IMG_20250328_084010.jpg?ex=68bc66e9&is=68bb1569&hm=2e176146e2c54b092ca39aca80b87d16091164ae5be8a11ab39ea7e31ec2a9ce&'
    ]
};

let currentLightbox = null;
let currentImageIndex = 0;

function openLightbox(lightboxId) {
    currentLightbox = lightboxId;
    currentImageIndex = 0;
    const lightbox = document.getElementById(`lightbox${lightboxId}`);
    const imageElement = document.getElementById(`lightboxImage${lightboxId}`);
    const images = lightboxImages[lightboxId];

    if (images && images.length > 0) {
        imageElement.src = images[currentImageIndex];
        imageElement.onload = () => {
            // Adjust container size to image natural ratio
            const container = document.querySelector(`#lightbox${lightboxId} .open-popups-content`);
            const maxWidth = window.innerWidth * 0.9;
            const maxHeight = window.innerHeight * 0.8;
            const imgRatio = imageElement.naturalWidth / imageElement.naturalHeight;
            let width = maxWidth;
            let height = width / imgRatio;

            if (height > maxHeight) {
                height = maxHeight;
                width = height * imgRatio;
            }

            container.style.width = `${width}px`;
            container.style.height = `${height}px`;
        };
        lightbox.classList.add('open');
    }
}

function closeLightbox(lightboxId) {
    const lightbox = document.getElementById(`lightbox${lightboxId}`);
    lightbox.classList.remove('open');
    currentLightbox = null;
    currentImageIndex = 0;
}

function nextImage(lightboxId) {
    const images = lightboxImages[lightboxId];
    if (images && currentImageIndex < images.length - 1) {
        currentImageIndex++;
        const imageElement = document.getElementById(`lightboxImage${lightboxId}`);
        imageElement.src = images[currentImageIndex];
    }
}

function prevImage(lightboxId) {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        const imageElement = document.getElementById(`lightboxImage${lightboxId}`);
        imageElement.src = lightboxImages[lightboxId][currentImageIndex];
    }
}

// Event listeners for lightbox controls
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('open-popups-nav')) {
        const lightboxId = e.target.getAttribute('data-lightbox');
        if (e.target.classList.contains('next')) {
            nextImage(lightboxId);
        } else if (e.target.classList.contains('prev')) {
            prevImage(lightboxId);
        }
    }

    if (e.target.classList.contains('open-popups-close')) {
        const lightboxId = e.target.getAttribute('data-lightbox');
        closeLightbox(lightboxId);
    }

    if (e.target.classList.contains('open-popups-lightbox')) {
        const lightboxId = e.target.id.replace('lightbox', '');
        closeLightbox(lightboxId);
    }


});
