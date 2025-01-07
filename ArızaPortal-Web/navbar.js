const currentPage = window.location.pathname.split('/').pop();
const user = JSON.parse(localStorage.getItem('user') || '{}');

const navbar = `
    <nav class="navbar">
        <div class="navbar-container">
            <a href="Form.html" class="nav-brand">Arıza Portal</a>
            <div class="nav-menu">
                <button class="menu-toggle">
                    <i class="fas fa-bars"></i>
                    Menü
                </button>
                <ul class="nav-dropdown">
                    <li><a href="Form.html" ${currentPage === 'Form.html' ? 'class="active"' : ''}>Ana Sayfa</a></li>
                    <li><a href="Bilgisayar.html" ${currentPage === 'Bilgisayar.html' ? 'class="active"' : ''}>Bilgisayar</a></li>
                    <li><a href="YaziciTarayici.html" ${currentPage === 'YaziciTarayici.html' ? 'class="active"' : ''}>Yazıcı/Tarayıcı</a></li>
                    <li><a href="AgCihazi.html" ${currentPage === 'AgCihazi.html' ? 'class="active"' : ''}>Ağ Cihazı</a></li>
                    <li><a href="Kamera.html" ${currentPage === 'Kamera.html' ? 'class="active"' : ''}>Kamera</a></li>
                    <li><a href="TelefonSantral.html" ${currentPage === 'TelefonSantral.html' ? 'class="active"' : ''}>Telefon/Santral</a></li>
                    <li><a href="Logo.html" ${currentPage === 'Logo.html' ? 'class="active"' : ''}>Logo</a></li>
                    <li><a href="Info.html" ${currentPage === 'Info.html' ? 'class="active"' : ''}>Bilgi</a></li>
                </ul>
            </div>
            <div class="user-menu">
                <span class="user-info">${user.fullName || 'Kullanıcı'}</span>
                <button onclick="logout()" class="logout-btn">Çıkış Yap</button>
            </div>
        </div>
    </nav>
`;

document.write(navbar);

// Menü toggle işlevi
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navDropdown = document.querySelector('.nav-dropdown');
    
    menuToggle.addEventListener('click', function() {
        navDropdown.classList.toggle('show');
    });

    // Menü dışına tıklandığında menüyü kapat
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-menu')) {
            navDropdown.classList.remove('show');
        }
    });
});

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'GirisYap.html';
} 