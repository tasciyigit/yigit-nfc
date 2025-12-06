// Modal açma fonksiyonu
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        // Sayfanın arkasının kaymasını engelle
        document.body.style.overflow = "hidden";
    }
}

// Modal kapama fonksiyonu
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
        // Kaydırmayı geri aç
        document.body.style.overflow = "auto";
    }
}

// Kullanıcı modalın dışına (siyah alana) tıklarsa kapat
window.onclick = function (event) {
    // Tıklanan elementin "modal" class'ına sahip olup olmadığını kontrol et
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Kopyalama Butonlarını Ekleme Fonksiyonu
function addCopyButtons() {
    // Sayfadaki tüm kod bloklarını (pre içindeki code) değil, direkt pre'leri seçelim
    const preBlocks = document.querySelectorAll('pre');

    preBlocks.forEach(pre => {
        // Eğer zaten buton varsa ekleme
        if (pre.querySelector('.copy-btn')) return;

        // Kopyalama butonu oluştur
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerHTML = '<i class="fas fa-copy"></i> Kopyala';

        // Butona tıklama olayı ekle
        button.addEventListener('click', () => {
            const code = pre.querySelector('code');
            if (!code) return; // Code etiketi yoksa çık

            const textToCopy = code.innerText; // Sadece metni al

            navigator.clipboard.writeText(textToCopy).then(() => {
                // Başarılı kopyalama animasyonu
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Kopyalandı!';
                button.style.backgroundColor = '#4CAF50'; // Yeşil renk

                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.backgroundColor = '#00d2be'; // Orijinal renk
                }, 2000);
            }).catch(err => {
                console.error('Kopyalama hatası:', err);
                button.innerText = 'Hata!';
            });
        });

        // Butonu pre bloğuna ekle
        pre.appendChild(button);
    });
}

// Sayfa yüklendiğinde butonları ve lightbox'ı ekle
document.addEventListener('DOMContentLoaded', () => {
    addCopyButtons();
    setupLightbox();
});

// Lightbox Kurulum Fonksiyonu
function setupLightbox() {
    // Lightbox HTML'ini oluşturup body'ye ekleyelim (Eğer yoksa)
    if (!document.getElementById('imgLightbox')) {
        const lightboxHTML = `
            <div id="imgLightbox" class="lightbox">
                <span class="lightbox-close">&times;</span>
                <img class="lightbox-content" id="lightboxImg">
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }

    const lightbox = document.getElementById('imgLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.querySelector('.lightbox-close');

    // Kapatma butonu
    closeBtn.onclick = function () {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
    }

    // Lightbox dışına tıklayınca kapatma
    lightbox.onclick = function (e) {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }

    // Tüm içerik resimlerini seç (schema-container içindekiler veya genel img'ler)
    // Şimdilik .schema-container img diyelim, isterseniz tüm .modal-content img yapabiliriz
    const images = document.querySelectorAll('.schema-container img');

    images.forEach(img => {
        img.addEventListener('click', function () {
            lightbox.style.display = "block";
            lightboxImg.src = this.src;
            // Alt metni (alt attribute) caption olarak ekleyebiliriz isterseniz
            document.body.style.overflow = "hidden";
        });
    });
}