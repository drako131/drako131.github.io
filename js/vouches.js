if (window.location.pathname.endsWith('/index.html')) {
            window.location.replace(window.location.pathname.replace('/index.html', '/') + window.location.hash);
        }
        const VIDEO_VOUCHES = [
            { type: "youtube", title: "Latest Vouch", description: "Fresh gameplay proof", src: "Ei0mvopugEI", source: "YouTube" },
            { type: "youtube", title: "New Vouch", description: "Recent user feedback", src: "_DCSjKUHgD0", source: "YouTube" },
            { type: "youtube", title: "Pro Feedback", description: "Unmatched performance", src: "xX0FHQZUcOg", source: "YouTube" },
            { type: "youtube", title: "Ace Easy", description: "Unmatched performance", src: "h_6STFMO2rs", source: "YouTube" },
            { type: "youtube", title: "Pro Feedback", description: "Unmatched performance", src: "d5j-fjiRFsc", source: "YouTube" },
            { type: "youtube", title: "Pro Feedback", description: "Unmatched performance", src: "eAiOyIje1CI", source: "YouTube" },
            { type: "youtube", title: "Pro Feedback", description: "Unmatched performance", src: "3kQPD5FCEzk", source: "YouTube" },
            { type: "youtube", title: "Pro Feedback", description: "Unmatched performance", src: "GGRKFEYVtiA", source: "YouTube" },
            { type: "youtube", title: "Pro Feedback", description: "Unmatched performance", src: "kdnKZKqHddA", source: "YouTube" },
            { type: "youtube", title: "Customer Highlight", description: "GamingEyes in action", src: "AE7Obn7p63k", source: "YouTube" },
            { type: "youtube", title: "Vouch Video", description: "Perfect performance", src: "pGijNXS3LeA", source: "YouTube" },
            { type: "youtube", title: "Review", description: "Top tier quality", src: "GCR1nKU7bQY", source: "YouTube" },
            { type: "youtube", title: "Showcase", description: "Vouch from satisfied user", src: "7UOpXCf5SZg", source: "YouTube" },
            { type: "youtube", title: "GamingEyes Vouch", description: "Zero issues detected", src: "rOnjRa49ggw", source: "YouTube" },
            { type: "youtube", title: "User Feedback", description: "Elite level support", src: "XaXhqx5GYUA", source: "YouTube" },
            { type: "youtube", title: "Vouch Demonstration", description: "Best on the market", src: "-B4ho8XggNA", source: "YouTube" },
            { type: "youtube", title: "Community Vouch", description: "Highly recommended", src: "ULgOASfnVyU", source: "YouTube" },
            { type: "youtube", title: "Pro Feedback", description: "Unmatched performance", src: "djHz3OYvXJ4", source: "YouTube" },
        ];
        const FALLBACK_IMAGES = [
            "imga2.webp","ama.webp","image (37).webp","image7.webp","image (36).webp",
            "image (35).webp","img7.PNG","image 1.webp","image-14.png","image (34).webp",
            "image (33).webp","image (32).webp","li34bVQ.webp","image (31).webp",
            "image (30).webp","616528751_910075708345432_8567055646851269476_n.webp",
            "image (29).webp","image (28).webp","image (27).webp","image (26).webp",
            "image (25).webp","A0881FC7-1437-4B21-85DA-52E0991DDCC8.webp","image (24).webp",
            "image (23).webp","image (22).webp","image (21).webp","image (20).webp",
            "image (19).webp","0017.webp","image (18).webp","IMG_3311.webp","image (17).webp",
            "IMG_3323.webp","image (16).webp","image (15).webp","image (14).webp",
            "image (13).webp","image (12).webp","image (11).webp","image (10).webp",
            "image (9).webp","image (8).webp","Screenshot_2_27_2026_7_39_24_PM.webp",
            "image (7).webp","image (6).webp","image (5).webp","image (4).webp",
            "image (3).webp","image (2).webp","image-13.webp","image (1).webp",
            "DDA6FD00-D3E5-4ED9-B3C2-BAD6D216B5A1.webp","image.webp","image-6.webp",
            "IMG_3813.webp","IMG_3850.webp"
        ];
        function imagesToVouches(filenames) {
            return filenames.map(filename => ({
                type: "image",
                title: "User Vouch",
                description: "Feedback from Discord",
                src: "../images/" + encodeURIComponent(filename),
                source: "Discord"
            }));
        }
        let VOUCHES = [...VIDEO_VOUCHES];
        async function loadImageManifest() {
            try {
                const resp = await fetch('/images/manifest.json');
                if (!resp.ok) throw new Error('Manifest not found');
                const filenames = await resp.json();
                const imageVouches = imagesToVouches(filenames.filter(f => f !== 'manifest.json'));
                VOUCHES = [...VIDEO_VOUCHES, ...imageVouches];
                return true;
            } catch (e) {
                console.warn('Manifest not available, using fallback image list');
                VOUCHES = [...VIDEO_VOUCHES, ...imagesToVouches(FALLBACK_IMAGES)];
                return false;
            }
        }
        document.addEventListener('DOMContentLoaded', async () => {
            const grid = document.getElementById('vouchesGrid');
            const lightbox = document.getElementById('lightbox');
            const lightboxContent = document.getElementById('lightboxContent');
            const lightboxClose = document.getElementById('lightboxClose');
            const vouchCount = document.getElementById('vouchCount');
            await loadImageManifest();
            vouchCount.textContent = VOUCHES.length;
            function renderVouches(filter = 'all') {
                grid.innerHTML = '';
                const filterType = filter === 'video' ? ['streamable', 'youtube'] : 
                                   filter === 'image' ? ['image'] : null;
                VOUCHES.forEach((vouch, index) => {
                    if (filterType && !filterType.includes(vouch.type)) return;
                    const card = document.createElement('div');
                    card.className = 'vouch-card';
                    let mediaHTML = '';
                    let badgeHTML = '';
                    let sourceIcon = '';
                    if (vouch.type === 'image') {
                        badgeHTML = '<span class="vouch-badge image-badge">Image</span>';
                        mediaHTML = `
                            <div class="vouch-media image-media" data-lightbox="image" data-src="${vouch.src}">
                                <img src="${vouch.src}" alt="${vouch.title}" loading="lazy">
                                ${badgeHTML}
                            </div>`;
                        sourceIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/><path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2M14 2H2a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094L14 9.5V3a1 1 0 0 0-1-1z"/></svg>`;
                    } else if (vouch.type === 'streamable') {
                        badgeHTML = '<span class="vouch-badge video-badge">Streamable</span>';
                        mediaHTML = `
                            <div class="vouch-media" data-lightbox="streamable" data-src="${vouch.src}">
                                <iframe src="https://streamable.com/e/${vouch.src}" allowfullscreen></iframe>
                                ${badgeHTML}
                            </div>`;
                        sourceIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z"/></svg>`;
                    } else if (vouch.type === 'youtube') {
                        badgeHTML = '<span class="vouch-badge youtube-badge">YouTube</span>';
                        const thumb = vouch.thumbnail || `https://img.youtube.com/vi/${vouch.src}/mqdefault.jpg`;
                        mediaHTML = `
                            <div class="vouch-media" data-lightbox="youtube" data-src="${vouch.src}">
                                <img src="${thumb}" alt="${vouch.title}" loading="lazy">
                                <div class="play-overlay">
                                    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                </div>
                                ${badgeHTML}
                            </div>`;
                        sourceIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/></svg>`;
                    }
                    card.innerHTML = `
                        ${mediaHTML}
                        <div class="vouch-info">
                            <h3>${vouch.title}</h3>
                            <p>${vouch.description}</p>
                            <div class="vouch-source">
                                ${sourceIcon}
                                <span>${vouch.source}</span>
                            </div>
                        </div>
                    `;
                    grid.appendChild(card);
                });
            }
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    renderVouches(btn.dataset.filter);
                    setTimeout(animateVouchCards, 50);
                });
            });
            grid.addEventListener('click', (e) => {
                const media = e.target.closest('.vouch-media');
                if (!media) return;
                const type = media.dataset.lightbox;
                const src = media.dataset.src;
                lightboxContent.innerHTML = '';
                if (type === 'image') {
                    lightboxContent.innerHTML = `<img src="${src}" alt="Vouch">`;
                } else if (type === 'streamable') {
                    lightboxContent.innerHTML = `<iframe src="https://streamable.com/e/${src}?autoplay=1" allowfullscreen></iframe>`;
                } else if (type === 'youtube') {
                    lightboxContent.innerHTML = `
                        <iframe src="https://www.youtube.com/embed/${src}?autoplay=1&mute=0&rel=0&origin=${encodeURIComponent(window.location.origin)}" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen 
                            referrerpolicy="strict-origin-when-cross-origin">
                        </iframe>`;
                }
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            function closeLightbox() {
                lightbox.classList.remove('active');
                lightboxContent.innerHTML = '';
                document.body.style.overflow = '';
            }
            lightboxClose.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
            renderVouches();
            const cursorCanvas = document.getElementById('cursor-canvas');
            const cursorCtx = cursorCanvas.getContext('2d');
            let mouseX = -200, mouseY = -200;
            let cursorParticles = [];
            function resizeCanvas() {
                cursorCanvas.width = window.innerWidth;
                cursorCanvas.height = window.innerHeight;
            }
            resizeCanvas();
            class CursorParticle {
                constructor() {
                    this.x = mouseX; this.y = mouseY;
                    this.size = Math.random() * 2 + 1;
                    this.speedX = Math.random() * 2 - 1;
                    this.speedY = Math.random() * 2 - 1;
                    this.hue = 350 + Math.random() * 20;
                    this.color = `hsl(${this.hue}, 100%, ${45 + Math.random() * 15}%)`;
                }
                update() { this.x += this.speedX; this.y += this.speedY; if (this.size > 0.2) this.size -= 0.08; }
                draw() {
                    cursorCtx.fillStyle = this.color;
                    cursorCtx.beginPath();
                    cursorCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    cursorCtx.fill();
                }
            }
            function animateCursor() {
                cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
                let gradient = cursorCtx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
                gradient.addColorStop(0, 'rgba(255, 23, 68, 0.12)');
                gradient.addColorStop(1, 'rgba(255, 23, 68, 0)');
                cursorCtx.fillStyle = gradient;
                cursorCtx.beginPath();
                cursorCtx.arc(mouseX, mouseY, 200, 0, Math.PI * 2);
                cursorCtx.fill();
                cursorCtx.strokeStyle = 'rgba(255, 23, 68, 0.8)';
                cursorCtx.lineWidth = 1.5;
                const s = 10;
                cursorCtx.beginPath();
                cursorCtx.moveTo(mouseX - s, mouseY); cursorCtx.lineTo(mouseX - 4, mouseY);
                cursorCtx.moveTo(mouseX + 4, mouseY); cursorCtx.lineTo(mouseX + s, mouseY);
                cursorCtx.moveTo(mouseX, mouseY - s); cursorCtx.lineTo(mouseX, mouseY - 4);
                cursorCtx.moveTo(mouseX, mouseY + 4); cursorCtx.lineTo(mouseX, mouseY + s);
                cursorCtx.stroke();
                cursorCtx.fillStyle = 'rgba(255, 23, 68, 1)';
                cursorCtx.beginPath();
                cursorCtx.arc(mouseX, mouseY, 2, 0, Math.PI * 2);
                cursorCtx.fill();
                for (let i = 0; i < cursorParticles.length; i++) {
                    cursorParticles[i].update();
                    cursorParticles[i].draw();
                    if (cursorParticles[i].size <= 0.2) { cursorParticles.splice(i, 1); i--; }
                }
                requestAnimationFrame(animateCursor);
            }
            window.addEventListener('resize', resizeCanvas);
            window.addEventListener('mousemove', (e) => {
                mouseX = e.clientX; mouseY = e.clientY;
                if (cursorParticles.length < 40) {
                    for (let i = 0; i < 2; i++) cursorParticles.push(new CursorParticle());
                }
            });
            animateCursor();
            gsap.registerPlugin(ScrollTrigger);
            gsap.to('.scroll-progress', {
                width: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.3,
                }
            });
            gsap.from('.main-header', {
                yPercent: -100,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.2,
            });
            gsap.from('.page-hero h1', {
                opacity: 0, y: 60, skewY: 2,
                duration: 1, ease: 'power4.out', delay: 0.4,
            });
            gsap.from('.page-hero p', {
                opacity: 0, y: 40,
                duration: 0.8, ease: 'power3.out', delay: 0.6,
            });
            gsap.from('.vouch-stat', {
                opacity: 0, y: 50, scale: 0.8,
                stagger: 0.15,
                duration: 0.8,
                ease: 'back.out(1.5)',
                delay: 0.8,
            });
            gsap.from('.filter-bar', {
                opacity: 0, y: 30,
                duration: 0.6, ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.filter-bar',
                    start: 'top 90%',
                    once: true,
                },
            });
            function animateVouchCards() {
                const cards = gsap.utils.toArray('.vouch-card');
                const firstBatch = cards.slice(0, 12);
                const restCards = cards.slice(12);
                firstBatch.forEach((card, i) => {
                    gsap.fromTo(card,
                        { opacity: 0, y: 40, scale: 0.92 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.6,
                            delay: i * 0.06,
                            ease: 'back.out(1.2)',
                            clearProps: 'transform',
                        }
                    );
                });
                restCards.forEach((card) => {
                    gsap.set(card, { opacity: 0, y: 30, scale: 0.95 });
                    ScrollTrigger.create({
                        trigger: card,
                        start: 'top 92%',
                        once: true,
                        onEnter: () => {
                            gsap.to(card, {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                duration: 0.5,
                                ease: 'power3.out',
                                clearProps: 'transform',
                            });
                        }
                    });
                });
            }
            setTimeout(animateVouchCards, 100);
            gsap.from('.main-footer', {
                opacity: 0, y: 40,
                duration: 0.8, ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.main-footer',
                    start: 'top 95%',
                    once: true,
                },
            });
        });
