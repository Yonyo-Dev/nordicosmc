// Server configuration
const SERVER_PORT = SERVER_CONFIG.port; // Server port from config

// DOM Elements
const playerCountElement = document.getElementById('playerCount');
const serverIPElement = document.getElementById('serverIP');
const ipTextElement = document.getElementById('ipText');
const statusDot = document.querySelector('.status-dot');
const voteModal = document.getElementById('voteModal');
const socialModal = document.getElementById('socialModal');
const closeButtons = document.querySelectorAll('.close');

// Get server IP from the UI
const SERVER_IP = ipTextElement.textContent;

// Server status check function
async function checkServerStatus() {
    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}:${SERVER_PORT}`);
        const data = await response.json();
        
        if (data.online) {
            statusDot.style.backgroundColor = '#4CAF50';
            playerCountElement.textContent = data.players?.online || 0;
        } else {
            statusDot.style.backgroundColor = '#f44336';
            playerCountElement.textContent = '0';
        }
    } catch (error) {
        console.error('Server status check failed:', error);
        statusDot.style.backgroundColor = '#f44336';
        playerCountElement.textContent = '0';
    }
}

// Copy IP function
function copyIP() {
    const ipText = document.querySelector('.server-ip span').textContent;
    navigator.clipboard.writeText(ipText).then(() => {
        const modal = document.getElementById('copyModal');
        modal.style.display = 'block';
    });
}

// Modal functions
function openVoteModal() {
    voteModal.style.display = 'block';
}

function openSocialModal() {
    socialModal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

// Event Listeners
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target);
    }
});

// Modal close functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('copyModal');
    const closeBtn = document.querySelector('.close');
    const okBtn = document.querySelector('.modal-btn');

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    okBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});

// Initial server status check
checkServerStatus();

// Check server status every 30 seconds
setInterval(checkServerStatus, 30000); 