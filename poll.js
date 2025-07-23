// Poll variables
let pollOptions = [];
let pollVotes = {};
let voters = new Set();
let chart = null;

// Initialize poll page
document.addEventListener('DOMContentLoaded', function() {
    const channelName = localStorage.getItem('kickChannel');
    const optionsInput = localStorage.getItem('pollOptions');
    
    if (!channelName || !optionsInput) {
        alert('Poll parametreleri bulunamadı!');
        window.location.href = 'index.html';
        return;
    }
    
    // Set channel name
    document.getElementById('channelName').textContent = channelName;
    
    // Parse poll options
    pollOptions = optionsInput.split(',').map(option => option.trim()).filter(option => option);
    
    if (pollOptions.length < 2) {
        alert('En az 2 poll seçeneği gerekli!');
        window.location.href = 'index.html';
        return;
    }
    
    // Initialize votes
    pollOptions.forEach(option => {
        pollVotes[option] = 0;
    });
    
    // Display poll options
    displayPollOptions();
    
    // Initialize chart
    initializeChart();
    
    // Connect to Kick chat
    connectToKickChat(channelName, handleChatMessage);
});

// Display poll options
function displayPollOptions() {
    const optionsList = document.getElementById('optionsList');
    optionsList.innerHTML = '';
    
    pollOptions.forEach((option, index) => {
        const optionElement = document.createElement('span');
        optionElement.className = 'bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm';
        optionElement.textContent = `${index + 1}. ${option}`;
        optionsList.appendChild(optionElement);
    });
    
    updateVoteDisplay();
}

// Handle chat messages
function handleChatMessage(message) {
    const username = message.sender.username;
    const content = message.content.toLowerCase().trim();
    
    // Add to chat feed
    addToChatFeed(username, message.content);
    
    // Check if message is a vote
    checkForVote(username, content);
}

// Check if message is a vote
function checkForVote(username, content) {
    // Check for option number (1, 2, 3, etc.)
    const numberMatch = content.match(/^(\d+)$/);
    if (numberMatch) {
        const optionIndex = parseInt(numberMatch[1]) - 1;
        if (optionIndex >= 0 && optionIndex < pollOptions.length) {
            registerVote(username, pollOptions[optionIndex]);
            return;
        }
    }
    
    // Check for option text
    for (const option of pollOptions) {
        if (content === option.toLowerCase()) {
            registerVote(username, option);
            return;
        }
    }
}

// Register a vote
function registerVote(username, option) {
    // Prevent duplicate votes
    if (voters.has(username)) {
        return;
    }
    
    voters.add(username);
    pollVotes[option]++;
    
    updateVoteDisplay();
    updateChart();
    addToVotersList(username, option);
    
    // Highlight the vote in chat
    highlightVote(username, option);
}

// Update vote display
function updateVoteDisplay() {
    const voteResults = document.getElementById('voteResults');
    const totalVotes = Object.values(pollVotes).reduce((sum, votes) => sum + votes, 0);
    
    document.getElementById('totalVotes').textContent = totalVotes;
    document.getElementById('voterCount').textContent = voters.size;
    
    voteResults.innerHTML = '';
    
    pollOptions.forEach((option, index) => {
        const votes = pollVotes[option];
        const percentage = totalVotes > 0 ? (votes / totalVotes * 100) : 0;
        
        const voteBar = document.createElement('div');
        voteBar.className = 'bg-white/10 rounded-lg p-4';
        
        voteBar.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <span class="text-white font-medium">${index + 1}. ${option}</span>
                <div class="text-right">
                    <span class="text-white font-bold">${votes}</span>
                    <span class="text-white/60 text-sm ml-1">(${percentage.toFixed(1)}%)</span>
                </div>
            </div>
            <div class="bg-white/20 rounded-full h-3 overflow-hidden">
                <div class="vote-bar bg-gradient-to-r from-blue-500 to-purple-500 h-full" style="width: ${percentage}%"></div>
            </div>
        `;
        
        voteResults.appendChild(voteBar);
    });
}

// Initialize chart
function initializeChart() {
    const ctx = document.getElementById('pollChart').getContext('2d');
    
    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: pollOptions,
            datasets: [{
                data: pollOptions.map(option => pollVotes[option]),
                backgroundColor: [
                    '#3B82F6', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B',
                    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
                ],
                borderWidth: 2,
                borderColor: '#ffffff20'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            }
        }
    });
}

// Update chart
function updateChart() {
    if (chart) {
        chart.data.datasets[0].data = pollOptions.map(option => pollVotes[option]);
        chart.update();
    }
}

// Add to chat feed
function addToChatFeed(username, content) {
    const chatFeed = document.getElementById('chatFeed');
    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message bg-white/10 rounded-lg p-2 text-sm';
    
    messageElement.innerHTML = `
        <span class="text-blue-300 font-semibold">${username}:</span>
        <span class="text-white/80">${content}</span>
    `;
    
    chatFeed.appendChild(messageElement);
    chatFeed.scrollTop = chatFeed.scrollHeight;
    
    // Keep only last 50 messages
    while (chatFeed.children.length > 50) {
        chatFeed.removeChild(chatFeed.firstChild);
    }
}

// Add to voters list
function addToVotersList(username, option) {
    const votersList = document.getElementById('votersList');
    const voterElement = document.createElement('div');
    voterElement.className = 'flex justify-between items-center py-1';
    
    voterElement.innerHTML = `
        <span>${username}</span>
        <span class="text-blue-300">${option}</span>
    `;
    
    votersList.appendChild(voterElement);
    votersList.scrollTop = votersList.scrollHeight;
}

// Highlight vote in chat
function highlightVote(username, option) {
    const chatFeed = document.getElementById('chatFeed');
    const lastMessage = chatFeed.lastElementChild;
    
    if (lastMessage && lastMessage.textContent.includes(username)) {
        lastMessage.className += ' bg-green-500/20 border-l-4 border-green-400';
        lastMessage.innerHTML += ` <span class="text-green-300 font-bold">✓ Oy: ${option}</span>`;
    }
}

// Reset poll
function resetPoll() {
    if (confirm('Poll sıfırlanacak. Emin misiniz?')) {
        pollOptions.forEach(option => {
            pollVotes[option] = 0;
        });
        voters.clear();
        
        updateVoteDisplay();
        updateChart();
        
        document.getElementById('votersList').innerHTML = '';
        document.getElementById('chatFeed').innerHTML = '';
    }
}

// Export results
function exportResults() {
    const totalVotes = Object.values(pollVotes).reduce((sum, votes) => sum + votes, 0);
    const channelName = document.getElementById('channelName').textContent;
    
    let result = `Poll Sonuçları - ${channelName}\n`;
    result += `Toplam Oy: ${totalVotes}\n\n`;
    
    pollOptions.forEach((option, index) => {
        const votes = pollVotes[option];
        const percentage = totalVotes > 0 ? (votes / totalVotes * 100) : 0;
        result += `${index + 1}. ${option}: ${votes} oy (${percentage.toFixed(1)}%)\n`;
    });
    
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `poll-results-${channelName}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
