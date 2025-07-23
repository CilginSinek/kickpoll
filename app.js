// Global variables
let kickChannel = '';
let pollOptions = [];
let chatConnection = null;

// Start poll function
function startPoll() {
    const channelInput = document.getElementById('kickChannel').value.trim();
    const optionsInput = document.getElementById('pollOptions').value.trim();
    const durationInput = document.getElementById('duration').value.trim();
    const durationTypeInput = document.getElementById('durationType').value;
    
    if (!channelInput) {
        alert('Lütfen Kick kanal adını girin!');
        return;
    }
    
    if (!optionsInput) {
        alert('Lütfen poll seçeneklerini girin!');
        return;
    }
    
    // Store data in localStorage for poll page
    localStorage.setItem('kickChannel', channelInput);
    localStorage.setItem('pollOptions', optionsInput);
    localStorage.setItem('duration', durationInput || '');
    localStorage.setItem('durationType', durationTypeInput);
    
    // Redirect to poll page
    window.location.href = 'poll.html';
}

// Start draw function
function startDraw() {
    const channelInput = document.getElementById('kickChannel').value.trim();
    const durationInput = document.getElementById('duration').value.trim();
    const durationTypeInput = document.getElementById('durationType').value;
    const keywordInput = document.getElementById('drawKeyword').value.trim();
    
    if (!channelInput) {
        alert('Lütfen Kick kanal adını girin!');
        return;
    }
    
    if (!keywordInput) {
        alert('Lütfen draw katılım kelimesini girin!');
        return;
    }
    
    // Store data in localStorage for draw page
    localStorage.setItem('kickChannel', channelInput);
    localStorage.setItem('duration', durationInput || '');
    localStorage.setItem('durationType', durationTypeInput);
    localStorage.setItem('drawKeyword', keywordInput);
    
    // Redirect to draw page
    window.location.href = 'draw.html';
}

// Update connection status
function updateConnectionStatus(status, color = 'gray-400') {
    const statusElement = document.getElementById('connectionStatus');
    if (statusElement) {
        statusElement.innerHTML = `<i class="fas fa-circle text-${color}"></i> ${status}`;
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we have stored channel data
    const storedChannel = localStorage.getItem('kickChannel');
    const storedOptions = localStorage.getItem('pollOptions');
    const storedDuration = localStorage.getItem('duration');
    const storedDurationType = localStorage.getItem('durationType');
    const storedDrawKeyword = localStorage.getItem('drawKeyword');
    
    if (storedChannel) {
        document.getElementById('kickChannel').value = storedChannel;
    }
    
    if (storedOptions) {
        document.getElementById('pollOptions').value = storedOptions;
    }
    
    if (storedDuration) {
        document.getElementById('duration').value = storedDuration;
    }
    
    if (storedDurationType) {
        document.getElementById('durationType').value = storedDurationType;
    }
    
    if (storedDrawKeyword) {
        document.getElementById('drawKeyword').value = storedDrawKeyword;
    }
});

// Utility function to connect to Kick chat
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
            const channelID = data.id;
            
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
            
            chatConnection = chat;
            return { channelData: data, chatConnection: chat };
        })
        .catch((error) => {
            console.error('Error connecting to Kick:', error);
            updateConnectionStatus('Bağlantı başarısız!', 'red-400');
            alert('Kick kanalına bağlanırken hata oluştu: ' + error.message);
        });
}
