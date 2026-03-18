        (function () {
            if (history.scrollRestoration) history.scrollRestoration = 'manual';
            if (window.location.hash) history.replaceState(null, null, window.location.pathname);
            window.scrollTo(0, 0);

            const menuToggle = document.getElementById('menuToggle');
            const menuOverlay = document.getElementById('menuOverlay');
            const toast = document.getElementById('toast');
            const htmlEl = document.documentElement;

            function updateThemeUI(isDark) {
                document.querySelectorAll('.theme-switch-wrapper').forEach(wrapper => {
                    const checkbox = wrapper.querySelector('input[type="checkbox"]');
                    const label = wrapper.querySelector('.slider .switch-label');
                    const icon = wrapper.querySelector('.circle i');

                    if (checkbox) checkbox.checked = isDark;
                    if (label) label.textContent = isDark ? 'Light' : 'Dark';
                    if (icon) icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
                });
            }

            function applyTheme(isDark) {
                if (isDark) {
                    htmlEl.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    htmlEl.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                }
                updateThemeUI(isDark);
            }

            const savedTheme = localStorage.getItem('theme');
            applyTheme(savedTheme === 'dark');

            document.querySelectorAll('.theme-switch input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    applyTheme(e.target.checked);
                });
            });

            function showToast(message = 'App will be available soon!') {
                if (!toast) return;
                toast.textContent = message;
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }

            if (menuToggle && menuOverlay) {
                menuToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    menuToggle.classList.toggle('active');
                    menuOverlay.classList.toggle('open');
                    document.body.classList.toggle('menu-is-open');
                    document.documentElement.classList.toggle('menu-is-open');
                });

                document.querySelectorAll('.menu-links a').forEach(link => {
                    link.addEventListener('click', () => {
                        menuToggle.classList.remove('active');
                        menuOverlay.classList.remove('open');
                        document.body.classList.remove('menu-is-open');
                        document.documentElement.classList.remove('menu-is-open');
                    });
                });
            }

            const downloadButtons = [
                'heroAppStoreBtn',
                'heroGooglePlayBtn',
                'footerAppStoreBtn',
                'footerGooglePlayBtn'
            ];

            downloadButtons.forEach(id => {
                const btn = document.getElementById(id);
                if (btn) {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        showToast();
                    });
                }
            });

            document.querySelectorAll('.store-btn, .hero-store-btn').forEach(btn => {
                if (!downloadButtons.some(id => btn.id === id)) {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        showToast();
                    });
                }
            });

        })();