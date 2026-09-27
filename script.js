/**
 * PsikoTerapi - Performans Odaklı, Hatasız ve Akıcı Etkileşim Scripti
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Splash Screen (Pürüzsüz, 60fps akıcı açılış)
    const splashScreen = document.getElementById('splashScreen');
    if (splashScreen) {
        setTimeout(() => {
            splashScreen.classList.add('fade-out');
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 600);
        }, 900);
    }

    // 2. Header Scroll Efekti
    const siteHeader = document.getElementById('siteHeader');
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // 3. S.S.S (FAQ) Akordeon Etkileşimi
    const faqCards = document.querySelectorAll('.faq-card');
    faqCards.forEach(card => {
        const questionBtn = card.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isActive = card.classList.contains('active');
                faqCards.forEach(c => c.classList.remove('active'));
                if (!isActive) {
                    card.classList.add('active');
                }
            });
        }
    });

    // 4. Form Gönderim Etkileşimi
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = appointmentForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Talebiniz Alınıyor...';

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Talebiniz Başarıyla Alındı!';
                submitBtn.style.backgroundColor = '#2d4034';
                appointmentForm.reset();

                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalContent;
                    submitBtn.style.backgroundColor = '';
                }, 4000);
            }, 800);
        });
    }

    // 5. Mobil Menü Toggle (Temiz, Sınıf Tabanlı & Dikey Açılır)
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = mainNav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });
    }

    // 6. Sayfa İçi Yumuşak Kaydırma
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    if (window.innerWidth <= 768 && mainNav) {
                        mainNav.classList.remove('active');
                        if (mobileToggle) {
                            mobileToggle.classList.remove('active');
                            mobileToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                }
            }
        });
    });

    // 7. İnteraktif Klinik Standart Kartları (Bespoke Luminous Hover)
    const pillarCards = document.querySelectorAll('.interactive-pillar-card');
    pillarCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 60%), rgba(255, 255, 255, 0.75)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });

    // 8. Pürüzsüz Scroll Reveal Dinamik Animasyon Sistemi (60fps Donanımsal Hızlandırma)
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }

    // 9. Mobil Menü Dışına Tıklandığında Kapanma
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && mainNav && mobileToggle) {
            if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target) && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

});
