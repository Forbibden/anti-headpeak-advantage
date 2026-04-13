# RAGEMP Anti-Headpeak Advantage

GTA V fizik motorundaki duvar arkası ateş avantajını engellemek için tasarlanmış, performans odaklı client-side bir çözümdür. Oyuncunun gövdesi ile merminin çarptığı nokta arasındaki 3D mesafeyi hesaplayarak, kapalı görüş açısından yapılan atışları anında algılar ve iptal eder.
This is a performance-oriented client-side solution designed to counter the wall-penetrating fire advantage in the GTA V physics engine. By calculating the 3D distance between the player's torso and the point where the bullet hits, it instantly detects and cancels shots fired from a closed field of view.

## 🎥 Preview / Öngösterim

[![Watch the video](https://img.youtube.com/vi/YOUTUBE_VIDEO_ID/maxresdefault.jpg)](https://youtu.be/Uyye_ZWfPoo?t=28)
> *Not: Görsele tıklayarak videoya erişim sağlayabilirsiniz / *Note: Click the image to watch the demonstration video.*

## 🚀 Features / Özellikler

* **Minimal Visual Feedback (CEF):** Includes a performance-oriented, simple, and clean CEF marker to show exactly where the blocked shot hit, utilizing hardware-accelerated CSS with zero impact on game FPS.
* * **Minimal Görsel Geri Bildirim (CEF):** Oyun FPS'sini sıfır düzeyde etkileyen donanım hızlandırmalı CSS kullanarak, bloklanan atışın tam olarak nereye isabet ettiğini gösteren, performansa yönelik, basit ve temiz bir CEF işaretçisi içerir.

## 🛠️ Installation / Kurulum

1. Copy the client-side JavaScript logic into your RAGEMP `client_packages` folder.
2. Add the `index.html` file to your CEF/Browser resources.
3. Ensure you link the CEF browser variable in your client script so the `execute` function triggers correctly.

1. İstemci tarafındaki JavaScript mantığını RAGEMP `client_packages` klasörüne kopyalayın.
2. `index.html` dosyasını CEF/Tarayıcı kaynaklarınıza ekleyin.
3. `execute` fonksiyonunun doğru şekilde tetiklenmesi için istemci betiğinizde CEF tarayıcı değişkenini bağladığınızdan emin olun.

## ⚙️ Configuration / Yapılandırma

You can easily adjust the tolerance distance at the top of the client script:

```javascript
// Default is 1.5 meters. You can decrease it to 1.0 for stricter gameplay.
const MAX_WALL_DISTANCE = 1.5; 
```

İstemci betiğinin en üstünde tolerans mesafesini kolayca ayarlayabilirsiniz:

```javascript
// Default is 1.5 meters. You can decrease it to 1.0 for stricter gameplay.
const MAX_WALL_DISTANCE = 1.5; 
```

## 📝 How It Works / Nasıl Çalışır?
GTA V's camera system allows players to recognize their character's aiming around corners while their body remains completely hidden behind a wall.

This powerful piece of equipment fires a beam of light toward the target. If the beam hits an obstacle significantly far from the target (exceeding the distance tolerance), the player confirms that their line of sight is physically obstructed by a wall, and the script terminates to cancel the `playerWeaponShot` event, stopping the `true` temperature.

GTA V'in kamera sistemi, oyuncuların karakterlerinin vücutları tamamen siper arkasında gizli kalırken köşelerin etrafından nişan almalarına olanak tanır.

Bu komut dosyası, oyuncunun vücudunun merkezinden hedefe doğru bir ışın atışı yapar. Eğer ışın atışı, hedeflenen noktadan önemli ölçüde uzakta (mesafe toleransını aşan) bir engele çarparsa, oyuncunun görüş hattının fiziksel olarak bir duvar tarafından engellendiğini doğrular ve komut dosyası, `playerWeaponShot` olayını iptal etmek için sessizce `true` değerini döndürür.
---

*RAGEMP topluluğu için adil, gerçekçi ve rekabetçi çatışma dinamiklerini korumak amacıyla geliştirilmiştir.*
