// Draw variables
let participants = new Set();
let drawKeyword = 'katıl';
let isDrawActive = true;
let winner = null;

// Initialize draw page
document.addEventListener('DOMContentLoaded', function() {
    const channelName = localStorage.getItem('kickChannel');
    
    if (!channelName) {
        alert('Kanal bilgisi bulunamadı!');
        window.location.href = 'index.html';
        return;
    }
    
    // Set channel name
    document.getElementById('channelName').textContent = channelName;
    
    // Initialize keyword display
    updateKeywordDisplay();
    
    // Connect to Kick chat
    connectToKickChat(channelName, handleChatMessage);
});

// Handle chat messages
function handleChatMessage(message) {
    const username = message.sender.username;
    const content = message.content.toLowerCase().trim();
    
    // Add to chat feed
    addToChatFeed(username, message.content);
    
    // Check if user is participating
    if (isDrawActive && content === drawKeyword.toLowerCase()) {
        addParticipant(username);
    }
}

// Add participant
function addParticipant(username) {
    if (participants.has(username)) {
        return; // Already participating
    }
    
    participants.add(username);
    updateStats();
    addToParticipantsGrid(username);
    addToRecentParticipants(username);
    highlightParticipation(username);
}

// Add to participants grid
function addToParticipantsGrid(username) {
    const grid = document.getElementById('participantsGrid');
    const participantElement = document.createElement('div');
    participantElement.className = 'participant bg-white/10 rounded-lg p-3 text-center';
    participantElement.id = `participant-${username}`;
    
    participantElement.innerHTML = `
        <div class="text-white font-medium text-sm truncate">${username}</div>
        <div class="text-white/60 text-xs mt-1">
            <i class="fas fa-user"></i>
        </div>
    `;
    
    grid.appendChild(participantElement);
}

// Add to recent participants
function addToRecentParticipants(username) {
    const recentList = document.getElementById('recentParticipants');
    const recentElement = document.createElement('div');
    recentElement.className = 'bg-white/10 rounded-lg p-2 text-sm';
    
    recentElement.innerHTML = `
        <span class="text-green-300"><i class="fas fa-plus-circle mr-1"></i></span>
        <span class="text-white">${username}</span>
        <span class="text-white/60 text-xs ml-2">${new Date().toLocaleTimeString()}</span>
    `;
    
    recentList.insertBefore(recentElement, recentList.firstChild);
    
    // Keep only last 10
    while (recentList.children.length > 10) {
        recentList.removeChild(recentList.lastChild);
    }
}

// Highlight participation in chat
function highlightParticipation(username) {
    const chatFeed = document.getElementById('chatFeed');
    const lastMessage = chatFeed.lastElementChild;
    
    if (lastMessage && lastMessage.textContent.includes(username)) {
        lastMessage.className += ' bg-green-500/20 border-l-4 border-green-400';
        lastMessage.innerHTML += ` <span class="text-green-300 font-bold">✓ Katıldı!</span>`;
    }
}

// Start draw
function startDraw() {
    if (participants.size === 0) {
        alert('Hiç katılımcı yok!');
        return;
    }
    
    if (winner) {
        if (!confirm('Zaten bir kazanan seçildi. Yeni çekiliş yapmak istiyor musunuz?')) {
            return;
        }
        resetDraw();
        return;
    }
    
    isDrawActive = false;
    updateStats();
    
    // Disable draw button temporarily
    const drawButton = document.getElementById('drawButton');
    drawButton.disabled = true;
    drawButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Çekiliş yapılıyor...';
    
    // Add roulette effect to participants
    const participantElements = document.querySelectorAll('.participant');
    participantElements.forEach(element => {
        element.classList.add('roulette');
    });
    
    // Select winner after animation
    setTimeout(() => {
        selectWinner();
        
        // Re-enable button
        drawButton.disabled = false;
        drawButton.innerHTML = '<i class="fas fa-redo mr-2"></i>Yeni Çekiliş';
        
        // Remove roulette effect
        participantElements.forEach(element => {
            element.classList.remove('roulette');
        });
    }, 2000);
}

// Select winner
function selectWinner() {
    const participantArray = Array.from(participants);
    const randomIndex = Math.floor(Math.random() * participantArray.length);
    winner = participantArray[randomIndex];
    
    // Show winner
    displayWinner(winner);
    
    // Highlight winner in grid
    const winnerElement = document.getElementById(`participant-${winner}`);
    if (winnerElement) {
        winnerElement.className += ' bg-gradient-to-r from-yellow-400 to-orange-500 transform scale-110 shadow-lg';
        winnerElement.innerHTML = `
            <div class="text-white font-bold text-sm truncate">${winner}</div>
            <div class="text-white text-xs mt-1">
                <i class="fas fa-crown"></i> KAZANAN
            </div>
        `;
    }
    
    updateStats();
}

// Display winner
function displayWinner(winnerName) {
    const winnerDisplay = document.getElementById('winnerDisplay');
    const winnerNameElement = document.getElementById('winnerName');
    
    winnerNameElement.textContent = winnerName;
    winnerDisplay.classList.remove('hidden');
    
    // Scroll to winner
    winnerDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Reset draw
function resetDraw() {
    if (participants.size > 0 && !confirm('Çekiliş sıfırlanacak. Emin misiniz?')) {
        return;
    }
    
    participants.clear();
    winner = null;
    isDrawActive = true;
    
    // Clear UI
    document.getElementById('participantsGrid').innerHTML = '';
    document.getElementById('recentParticipants').innerHTML = '';
    document.getElementById('winnerDisplay').classList.add('hidden');
    document.getElementById('chatFeed').innerHTML = '';
    
    // Reset button
    const drawButton = document.getElementById('drawButton');
    drawButton.innerHTML = '<i class="fas fa-magic mr-2"></i>Çekilişi Başlat';
    
    updateStats();
}

// Update keyword
function updateKeyword() {
    const newKeyword = document.getElementById('drawKeyword').value.trim();
    if (newKeyword) {
        drawKeyword = newKeyword;
        updateKeywordDisplay();
    }
}

// Update keyword display
function updateKeywordDisplay() {
    document.getElementById('currentKeyword').textContent = drawKeyword;
    
    // Update keyword on input change
    document.getElementById('drawKeyword').addEventListener('input', function() {
        drawKeyword = this.value.trim() || 'katıl';
        document.getElementById('currentKeyword').textContent = drawKeyword;
    });
}

// Update stats
function updateStats() {
    document.getElementById('participantCount').textContent = participants.size;
    
    let status = 'Beklemede';
    let statusColor = 'text-green-300';
    
    if (!isDrawActive && !winner) {
        status = 'Çekiliş yapılıyor...';
        statusColor = 'text-yellow-300';
    } else if (winner) {
        status = 'Tamamlandı';
        statusColor = 'text-blue-300';
    } else if (isDrawActive) {
        status = 'Aktif';
        statusColor = 'text-green-300';
    }
    
    const statusElement = document.getElementById('drawStatus');
    statusElement.textContent = status;
    statusElement.className = `font-bold ${statusColor}`;
}

// Add to chat feed
function addToChatFeed(username, content) {
    const chatFeed = document.getElementById('chatFeed');
    const messageElement = document.createElement('div');
    messageElement.className = 'bg-white/10 rounded-lg p-2 text-sm';
    
    messageElement.innerHTML = `
        <span class="text-blue-300 font-semibold">${username}:</span>
        <span class="text-white/80">${content}</span>
    `;
    
    chatFeed.appendChild(messageElement);
    chatFeed.scrollTop = chatFeed.scrollHeight;
    
    // Keep only last 30 messages
    while (chatFeed.children.length > 30) {
        chatFeed.removeChild(chatFeed.firstChild);
    }
}

// Connect to Kick chat (using the function from app.js)
function connectToKickChat(channelName, onMessageCallback) {
    updateConnectionStatus('Kanala bağlanıyor...', 'yellow-400');
    
    fetch(`https://kick.com/api/v2/channels/${channelName}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch channel data");
            }
            return response.json();
        })
        .then((data) => {
            const chatroom = data.chatroom.id;
            
            updateConnectionStatus('Chat\'e bağlanıyor...', 'yellow-400');
            
            const chat = new WebSocket(
                "wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.4.0-rc2&flash=false"
            );
            
            chat.onopen = function () {
                const subscribeMessage1 = {
                    event: "pusher:subscribe",
                    data: {
                        auth: "",
                        channel: `chatrooms.${chatroom}.v2`,
                    },
                };
                
                const subscribeMessage2 = {
                    event: "pusher:subscribe",
                    data: {
                        auth: "",
                        channel: `chatroom_${chatroom}`,
                    },
                };
                
                chat.send(JSON.stringify(subscribeMessage1));
                chat.send(JSON.stringify(subscribeMessage2));
                
                updateConnectionStatus('Bağlandı!', 'green-400');
            };
            
            chat.onmessage = function (event) {
                const metaMessage = JSON.parse(event.data);
                
                if (
                    metaMessage.event == "pusher:connection_established" ||
                    metaMessage.event == "pusher_internal:subscription_succeeded"
                ) {
                    return;
                }
                
                if (metaMessage.event == "App\\Events\\ChatMessageEvent") {
                    const message = JSON.parse(metaMessage.data);
                    onMessageCallback(message);
                }
            };
            
            chat.onerror = function (error) {
                console.error("WebSocket error:", error);
                updateConnectionStatus('Bağlantı hatası!', 'red-400');
            };
            
            chat.onclose = function () {
                console.warn("WebSocket connection closed. Retrying in 5 seconds...");
                updateConnectionStatus('Bağlantı koptu, yeniden denenecek...', 'orange-400');
                
                setTimeout(() => {
                    connectToKickChat(channelName, onMessageCallback);
                }, 5000);
            };
        })
        .catch((error) => {
            console.error('Error connecting to Kick:', error);
            updateConnectionStatus('Bağlantı başarısız!', 'red-400');
        });
}

// Update connection status
function updateConnectionStatus(status, color = 'gray-400') {
    const statusElement = document.getElementById('connectionStatus');
    if (statusElement) {
        statusElement.innerHTML = `<i class="fas fa-circle text-${color}"></i> <span class="text-white/60">${status}</span>`;
    }
}
