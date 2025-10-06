# 🎯 KickPoll - Kick Chat Poll & Draw

**Languages / Diller:** [🇬🇧 English](#english) | [🇹🇷 Türkçe](#türkçe)

---

## <a name="english"></a>🇬🇧 English

A modern web application that tracks Kick.com chat messages in real-time to conduct **polls (voting)** and **draws (giveaways)**.

## 🚀 Features

### 📊 Poll (Voting) System
- **Real-time voting** - Chat messages are processed instantly
- **Multiple format support** - Users can vote by typing numbers (1,2,3) or text
- **Single vote system** - Each user can vote only once
- **Visual charts** - Dynamic pie charts with Chart.js
- **Result export** - Download poll results in TXT format
- **Live statistics** - Vote percentages and total vote count
- **Timer system** - Set duration for automatic poll closure
- **Pause/Resume** - Pause and resume the timer
- **Duplicate protection** - Identical options are automatically merged

### 🎲 Draw (Giveaway) System
- **Participant collection** - Automatically register users who type the specified word
- **Customizable keyword** - Set participation keyword on main page
- **Random selection** - Fair giveaway algorithm
- **Visual animations** - Spinning animation effects during the draw
- **Winner display** - Large and impressive winner screen
- **Participant tracking** - Real-time participant list
- **Auto draw** - Automatically starts when time expires
- **Timer control** - Pause and resume duration

## ⏰ Timer System

### Shared Duration Setting:
- **Single input** - Common duration setting for both Poll and Draw
- **Seconds/Minutes** option
- **1-3600** value range
- **Optional** - Runs indefinitely if left blank

### Poll Timer:
- **Stops accepting votes** when time expires
- Automatically shows results
- Winner/tie analysis

### Draw Timer:
- **Collects participants** during the duration
- **Automatically starts draw** when time expires
- Warns if there are no participants

## 🎨 Design Features

- **Modern Glassmorphism** design
- **Responsive** layout - Mobile and desktop compatible
- **Smooth animations** and transition effects
- **Tailwind CSS** for professional appearance
- **Font Awesome** icons
- **Gradient** backgrounds and buttons

## 📱 Usage

### Starting a Poll:
1. Enter **Kick channel name** on the main page
2. **Write poll options** separated by commas (e.g., `yes,no,undecided`)
3. **Set duration** (optional) - e.g., `30 seconds`
4. Click "Start Poll" button
5. Users vote by typing numbers or options in chat
6. Auto-closes when timer expires or you can manually reset

### Starting a Draw:
1. Enter **Kick channel name** on the main page
2. **Set participation keyword** (e.g., `join`, `!enter`)
3. **Set duration** (optional) - e.g., `2 minutes`
4. Click "Start Draw" button
5. Users participate by typing your specified keyword
6. Auto-starts if duration is set, otherwise start manually

## 🎮 Control Features

### Timer Control:
- **Pause** - Temporarily stops the timer
- **Resume** - Timer continues from where it left off
- **Reset** - Resets everything and restarts the timer

### Poll Control:
- **Reset** - Resets all votes, timer restarts
- **Download** - Download results in TXT format
- **Pause/Resume** - Timer control

### Draw Control:
- **Start Draw** - Manually start the giveaway
- **Reset** - Reset participants, timer restarts
- **Pause/Resume** - Timer control

## 🔧 Technical Details

### Technologies Used:
- **HTML5** - Semantic markup
- **CSS3** - Modern styling and animations
- **JavaScript ES6+** - Dynamic functionality
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Chart visualization
- **Font Awesome** - Icon library

### API Connections:
- **Kick.com API** - Fetching channel information
- **WebSocket** - Real-time chat messages
- **Pusher WebSocket** - Kick chat protocol

### Features:
- **CORS** compatible API calls
- **Auto-reconnection** system
- **LocalStorage** for data storage
- **Responsive** design
- **Real-time** updates

## 📂 File Structure

```
kickpoll/
├── index.html          # Main page - Channel, option, duration and keyword input
├── poll.html           # Poll page - Voting tracking and timer
├── draw.html           # Draw page - Giveaway system and timer
├── app.js              # Main JavaScript - Common functions
├── poll.js             # Poll JavaScript - Voting logic and timer
├── draw.js             # Draw JavaScript - Giveaway logic and timer
└── README.md           # Project documentation
```

## 🚦 Installation and Running

1. **Download** or clone the files
2. Open `index.html` file in **web browser**
3. Enter **Kick channel name**
4. Configure **Poll/Draw** settings
5. Set **timer** (optional)
6. Start **Poll/Draw**
7. **Internet connection** required (for CDNs)

## 🌐 Browser Compatibility

- ✅ **Chrome** 80+
- ✅ **Firefox** 75+
- ✅ **Safari** 13+
- ✅ **Edge** 80+
- ✅ **Mobile** browsers

## 📈 Usage Scenarios

### Poll Examples:
- Game selection: `cs2,valorant,lol`
- Decision making: `yes,no,undecided`
- Ranking: `1,2,3,4,5`

### Draw Examples:
- Game key distribution
- Community Turbo giveaway
- Special prize distribution
- Follower events

## 🔒 Security

- **Client-side** application - No server required
- **Secure connection** via Kick API
- **No personal data** stored
- **Real-time** data is temporary

## 🤝 Contributing

This project is **open source** and open to development. Improvement suggestions and bug reports are welcome.

## 📄 License

This project is distributed under the **MIT License**.

---

### 🎉 **Perfect tool for Kick streamers!**

Organize interactive polls and conduct giveaways in your live streams with **KickPoll**. Increase engagement with your followers!

---
---

## <a name="türkçe"></a>🇹🇷 Türkçe

Kick.com chat mesajlarını gerçek zamanlı olarak takip ederek **poll (oylama)** ve **draw (çekiliş)** işlemleri yapabilen modern web uygulaması.

## 🚀 Özellikler

### 📊 Poll (Oylama) Sistemi
- **Gerçek zamanlı oylama** - Chat mesajları anında işlenir
- **Çoklu format desteği** - Kullanıcılar sayı (1,2,3) veya metin yazarak oy verebilir
- **Tekil oy sistemi** - Her kullanıcı sadece bir kez oy verebilir
- **Görsel grafikler** - Chart.js ile dinamik pasta grafikleri
- **Sonuç dışa aktarma** - Poll sonuçlarını TXT formatında indirebilme
- **Canlı istatistikler** - Oy oranları ve toplam oy sayısı
- **Timer sistemi** - Süre belirleyerek otomatik poll kapanması
- **Pause/Resume** - Timer'ı durdurma ve devam ettirme
- **Dublicate koruması** - Aynı seçenekler otomatik birleştiriliyor

### 🎲 Draw (Çekiliş) Sistemi
- **Katılımcı toplama** - Belirtilen kelimeyi yazanları otomatik kayıt
- **Özelleştirilebilir kelime** - Ana sayfada katılım kelimesi belirleme
- **Rastgele seçim** - Adil çekiliş algoritması
- **Görsel animasyonlar** - Çekiliş sırasında dönen animasyon efektleri
- **Kazanan gösterimi** - Büyük ve gösterişli kazanan ekranı
- **Katılımcı takibi** - Gerçek zamanlı katılımcı listesi
- **Otomatik çekiliş** - Süre bitince kendiliğinden başlar
- **Timer kontrolü** - Süre durdurma ve devam ettirme

## ⏰ Timer Sistemi

### Ortak Süre Ayarı:
- **Tek input** - Poll ve Draw için ortak süre ayarı
- **Saniye/Dakika** seçeneği
- **1-3600** arası değer girişi
- **Opsiyonel** - Boş bırakılırsa süresiz çalışır

### Poll Timer:
- Süre bitince **oy almayı durdurur**
- Sonuçları otomatik gösterir
- Kazanan/berabere analizi

### Draw Timer:
- Süre boyunca **katılımcı toplar**
- Süre bitince **otomatik çekiliş başlar**
- Katılımcı yoksa uyarı verir

## 🎨 Tasarım Özellikleri

- **Modern Glassmorphism** tasarım
- **Responsive** layout - Mobil ve masaüstü uyumlu
- **Smooth animasyonlar** ve geçiş efektleri
- **Tailwind CSS** ile profesyonel görünüm
- **Font Awesome** ikonları
- **Gradient** arka planlar ve butonlar

## 📱 Kullanım

### Poll Başlatma:
1. Ana sayfada **Kick kanal adını** girin
2. **Poll seçeneklerini** virgülle ayırarak yazın (örn: `evet,hayır,kararsızım`)
3. **Süre belirleyin** (opsiyonel) - örn: `30 saniye`
4. "Poll Başlat" butonuna tıklayın
5. Kullanıcılar chat'te sayı veya seçenek yazarak oy verir
6. Timer bitince otomatik kapanır veya manuel sıfırlayabilirsiniz

### Draw Başlatma:
1. Ana sayfada **Kick kanal adını** girin
2. **Katılım kelimesini** belirleyin (örn: `katıl`, `!join`)
3. **Süre belirleyin** (opsiyonel) - örn: `2 dakika`
4. "Draw Başlat" butonuna tıklayın
5. Kullanıcılar belirlediğiniz kelimeyi yazarak katılır
6. Süre varsa otomatik başlar, yoksa manuel başlatırsınız

## 🎮 Kontrol Özellikleri

### Timer Kontrolü:
- **Durdur** - Timer'ı geçici olarak durdurur
- **Devam Et** - Timer kaldığı yerden devam eder
- **Sıfırla** - Her şeyi sıfırlar ve timer'ı yeniden başlatır

### Poll Kontrolü:
- **Sıfırla** - Tüm oyları sıfırlar, timer yeniden başlar
- **İndir** - Sonuçları TXT formatında indirir
- **Durdur/Devam** - Timer kontrolü

### Draw Kontrolü:
- **Çekilişi Başlat** - Manuel çekiliş başlatır
- **Sıfırla** - Katılımcıları sıfırlar, timer yeniden başlar
- **Durdur/Devam** - Timer kontrolü

## 🔧 Teknik Detaylar

### Kullanılan Teknolojiler:
- **HTML5** - Semantic markup
- **CSS3** - Modern styling ve animasyonlar
- **JavaScript ES6+** - Dinamik işlevsellik
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Grafik görselleştirme
- **Font Awesome** - Icon library

### API Bağlantıları:
- **Kick.com API** - Kanal bilgilerini alma
- **WebSocket** - Gerçek zamanlı chat mesajları
- **Pusher WebSocket** - Kick chat protokolü

### Özellikler:
- **CORS** uyumlu API çağrıları
- **Otomatik yeniden bağlanma** sistemi
- **LocalStorage** kullanarak veri saklama
- **Responsive** tasarım
- **Real-time** güncellemeler

## 📂 Dosya Yapısı

```
kickpoll/
├── index.html          # Ana sayfa - Kanal, seçenek, süre ve keyword girişi
├── poll.html           # Poll sayfası - Oylama takibi ve timer
├── draw.html           # Draw sayfası - Çekiliş sistemi ve timer
├── app.js              # Ana JavaScript - Ortak fonksiyonlar
├── poll.js             # Poll JavaScript - Oylama mantığı ve timer
├── draw.js             # Draw JavaScript - Çekiliş mantığı ve timer
└── README.md           # Proje dokümantasyonu
```

## 🚦 Kurulum ve Çalıştırma

1. **Dosyaları indirin** veya klonlayın
2. **Web tarayıcısında** `index.html` dosyasını açın
3. **Kick kanal adını** girin
4. **Poll/Draw** ayarlarını yapın
5. **Timer** belirleyin (opsiyonel)
6. **Poll/Draw** başlatın
4. **İnternet bağlantısı** gereklidir (CDN'ler için)

## 🌐 Tarayıcı Uyumluluğu

- ✅ **Chrome** 80+
- ✅ **Firefox** 75+
- ✅ **Safari** 13+
- ✅ **Edge** 80+
- ✅ **Mobile** tarayıcılar

## 📈 Kullanım Senaryoları

### Poll Örnekleri:
- Oyun seçimi: `cs2,valorant,lol`
- Karar verme: `evet,hayır,kararsızım`
- Sıralama: `1,2,3,4,5`

### Draw Örnekleri:
- Oyun key dağıtımı
- Topluyo Turbo çekilişi
- Özel ödül dağıtımı
- Takipçi etkinlikleri

## 🔒 Güvenlik

- **Client-side** uygulama - Sunucu gerekmez
- **Kick API** üzerinden güvenli bağlantı
- **Kişisel veri** saklanmaz
- **Real-time** veriler geçici

## 🤝 Katkı

Bu proje **açık kaynak** ve geliştirilmeye açıktır. İyileştirme önerileri ve bug raporları memnuniyetle karşılanır.

## 📄 Lisans

Bu proje **MIT Lisansı** altında dağıtılmaktadır.

---

### 🎉 **Kick streamerları için mükemmel bir araç!**

**KickPoll** ile canlı yayınlarınızda interaktif poll'lar düzenleyin ve çekiliş yapın. Takipçilerinizle etkileşimi artırın!
