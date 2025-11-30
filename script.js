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
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
}