// DOM Elements
const cardContainer = document.getElementById('cardContainer');
const revealBtn = document.getElementById('revealBtn');
const changeMessageBtn = document.getElementById('changeMessageBtn');
const giftBox = document.getElementById('giftBox');
const heart = document.getElementById('heart');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popupTitle');
const popupBody = document.getElementById('popupBody');
const confettiContainer = document.getElementById('confettiContainer');

// Counter untuk Easter Egg
let heartClickCount = 0;

// Messages Array
const messages = [
    {
        main: "Hey, I’m sorry about yesterday. I didn’t mean to hurt you.",
        reason: "I so sorry for my behavior. I understand it wasn’t right, and I’ll do better."
    },
    {
        main: "Hey, I’m sorry about yesterday. I didn’t mean to hurt you.",
        reason: "I’m sorry. I wasn’t thinking clearly at the time, and I should’ve handled it better."
    },
    {
        main: "Hey, I’m sorry about yesterday. I didn’t mean to hurt you.",
        reason: "I didn’t fully consider how my actions would affect you. That was my mistake."
    },
    {
        main: "Hey, I’m sorry about yesterday. I didn’t mean to hurt you.",
        reason: "I reacted without really thinking things through. I should’ve handled it better."
    },
    {
        main: "Hey, I’m sorry about yesterday. I didn’t mean to hurt you.",
        reason: "I should’ve listened more instead of reacting."
    }
];

// Gifts Array (8 pilihan)
const gifts = [
    {
        title: "💌",
        content: "I know I made a mistake, and I’m sorry for that. It wasn’t fair to you, and I should’ve been more thoughtful. I really care about you, so seeing things go wrong like that… it stays on my mind. I’ll do better next time."
    },
];

// Event Listeners
revealBtn.addEventListener('click', () => {
    cardContainer.style.transform = 'rotateY(180deg)';
    createFloatingHearts();
});

changeMessageBtn.addEventListener('click', () => {
    changeMessage();
});

giftBox.addEventListener('click', () => {
    openRandomGift();
});

heart.addEventListener('click', () => {
    heartClickCount++;
    createHeartBurst();

    if (heartClickCount === 5) {
        easterEgg();
        heartClickCount = 0;
    }
});

// Close popup with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// Functions
function changeMessage() {
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];

    const mainMessage = document.getElementById('mainMessage');
    const reasonText = document.getElementById('reasonText');

    // Fade out
    mainMessage.style.opacity = '0';
    reasonText.style.opacity = '0';

    setTimeout(() => {
        mainMessage.textContent = randomMsg.main;
        reasonText.textContent = randomMsg.reason;

        // Fade in
        mainMessage.style.transition = 'opacity 0.6s ease';
        reasonText.style.transition = 'opacity 0.6s ease';
        mainMessage.style.opacity = '1';
        reasonText.style.opacity = '1';
    }, 300);
}

function openRandomGift() {
    const randomGift = gifts[Math.floor(Math.random() * gifts.length)];

    popupTitle.textContent = randomGift.title;
    popupBody.innerHTML = `
        <p>${randomGift.content}</p>
        <div style="margin-top: 1.5rem; font-size: 1.2rem;">
            Forgive me DD :(
        </div>
    `;

    popup.classList.add('show');
    createConfetti();
    triggerBoxAnimation();
}

function closePopup() {
    popup.classList.remove('show');
}

function createFloatingHearts() {
    const heartEmojis = ['❤️', '💙', '💜', '💕', '💖', '✨', '🌹'];

    for (let i = 0; i < 15; i++) {
        const floatHeart = document.createElement('div');
        floatHeart.className = 'float-heart';
        floatHeart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        floatHeart.style.left = Math.random() * 100 + '%';
        floatHeart.style.animationDelay = Math.random() * 0.5 + 's';

        document.querySelector('.floating-hearts').appendChild(floatHeart);

        setTimeout(() => floatHeart.remove(), 4000);
    }
}

function createHeartBurst() {
    const burstHearts = ['❤️', '💕', '💖', '✨'];

    for (let i = 0; i < 8; i++) {
        const burst = document.createElement('div');
        burst.textContent = burstHearts[Math.floor(Math.random() * burstHearts.length)];
        burst.style.position = 'fixed';
        burst.style.left = '50%';
        burst.style.top = '50%';
        burst.style.transform = `translate(-50%, -50%) rotate(${(i * 45)}deg) translateY(-80px)`;
        burst.style.fontSize = '1.5rem';
        burst.style.animation = 'burst-out 0.8s ease-out forwards';
        burst.style.pointerEvents = 'none';

        document.body.appendChild(burst);

        setTimeout(() => burst.remove(), 800);
    }

    // Add burst animation
    if (!document.querySelector('style[data-burst-animation]')) {
        const style = document.createElement('style');
        style.setAttribute('data-burst-animation', 'true');
        style.textContent = `
            @keyframes burst-out {
                0% {
                    opacity: 1;
                    transform: translate(-50%, -50%) rotate(0) translateY(-80px);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) rotate(360deg) translateY(-150px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function createConfetti() {
    const colors = [
        '#FF6B9D',
        '#FFB6D9',
        '#8B5CF6',
        '#C4B5FD',
        '#FFD1E3',
        '#FFD700'
    ];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.animationDuration = Math.random() * 2 + 2 + 's';

        confettiContainer.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
}

function triggerBoxAnimation() {
    giftBox.style.animation = 'none';
    setTimeout(() => {
        giftBox.style.animation = 'shake 0.5s ease-in-out';
    }, 10);
}

function easterEgg() {
    // Buka card dengan auto
    cardContainer.style.transform = 'rotateY(180deg)';

    // Buat banyak hati
    createFloatingHearts();
    createFloatingHearts();

    // Popup Easter Egg
    popupTitle.textContent = '🎉 Bonus Easter Egg! 🎉';
    popupBody.innerHTML = `
        <p style="font-size: 1.1rem; margin-bottom: 1rem;">
            Wow! Kamu telah menemukan rahasia tersembunyi! 🤫
        </p>
        <p>Klik jantung 5 kali lagi untuk hadiah eksklusif lainnya!</p>
        <div style="margin-top: 1.5rem; font-size: 2rem;">
            i'm sorry dd 💕
        </div>
    `;

    popup.classList.add('show');
    createConfetti();
    createConfetti();
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% {
            transform: scale(1) rotate(0deg);
        }
        25% {
            transform: scale(1.05) rotate(-5deg);
        }
        50% {
            transform: scale(1.1) rotate(5deg);
        }
        75% {
            transform: scale(1.05) rotate(-5deg);
        }
    }
`;
document.head.appendChild(style);

// Initialize
window.addEventListener('load', () => {
    // Fade in effect saat load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-out';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});