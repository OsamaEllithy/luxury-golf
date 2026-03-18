        (function() {
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
                'downloadAppBtn',
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

            document.querySelectorAll('.store-btn').forEach(btn => {
                if (!downloadButtons.some(id => btn.id === id)) {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        showToast();
                    });
                }
            });

            const serveGrid = document.querySelector('.serve-grid');
            const serveDots = document.querySelectorAll('.serve-dot');
            if (serveGrid && serveDots.length > 0) {
                serveGrid.addEventListener('scroll', () => {
                    const scrollLeft = serveGrid.scrollLeft;
                    const cardWidth = serveGrid.clientWidth;
                    const activeIndex = Math.round(scrollLeft / cardWidth);
                    serveDots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === activeIndex);
                    });
                });

                serveDots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        const cardWidth = serveGrid.clientWidth;
                        serveGrid.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
                    });
                });
            }

            function reveal() {
                const reveals = document.querySelectorAll(".reveal");
                for (let i = 0; i < reveals.length; i++) {
                    const windowHeight = window.innerHeight;
                    const elementTop = reveals[i].getBoundingClientRect().top;
                    const elementVisible = 100;
                    if (elementTop < windowHeight - elementVisible) {
                        reveals[i].classList.add("active");
                    }
                }
            }
            window.addEventListener("scroll", reveal);
            reveal();

            setTimeout(() => {
                const counters = document.querySelectorAll('.stat-card h3');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const duration = 2000;
                    const stepTime = 20;
                    const steps = duration / stepTime;
                    const increment = target / steps;
                    let current = 0;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.innerText = target + suffix;
                            clearInterval(timer);
                        } else {
                            const displayValue = Number.isInteger(target) ? Math.ceil(current) : current.toFixed(1);
                            counter.innerText = displayValue + suffix;
                        }
                    }, stepTime);
                });
            }, 1500);

        })();