# 🎯 KickPoll - Kick Chat Poll & Draw

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
