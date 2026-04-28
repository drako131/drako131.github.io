window.__overlayTimeout = setTimeout(function() {
            var ov = document.getElementById('entranceOverlay');
            if (ov) ov.style.display = 'none';
            document.querySelectorAll('.animate-on-scroll, .feature-card, .showcase-slide, .store-cta, .price-card, .community-cta, .main-header, .main-footer, .hero-badge, .hero h1, .hero p, .hero-actions .btn').forEach(function(el) {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
        }, 5000);

if (window.location.protocol !== 'file:' && window.location.pathname.endsWith('/index.html')) {
            window.location.replace(window.location.pathname.replace('/index.html', '/') + window.location.hash);
        }
        document.addEventListener('DOMContentLoaded', () => {
            if (window.__overlayTimeout) clearTimeout(window.__overlayTimeout);
            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const isMobile = window.innerWidth <= 768;
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
            });
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => lenis.raf(time * 1000));
            gsap.ticker.lagSmoothing(0);
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(anchor.getAttribute('href'));
                    if (target) lenis.scrollTo(target, { offset: -80 });
                });
            });
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
            gsap.set('.main-header', { yPercent: -100, opacity: 0 });
            gsap.set('.hero-badge', { opacity: 0, y: 40, scale: 0.7 });
            gsap.set('.hero h1', { opacity: 0, y: 100, skewY: 3 });
            gsap.set('.hero p', { opacity: 0, y: 50 });
            gsap.set('.hero-actions .btn', { opacity: 0, y: 40, scale: 0.7 });
            gsap.set('.feature-card', { opacity: 0, y: 100, rotateX: 25, scale: 0.85 });
            gsap.set('.showcase-slide', { opacity: 0, y: 80 });
            gsap.set('.store-cta', { opacity: 0, x: -150, rotateY: 12 });
            gsap.set('.price-card', { opacity: 0, scale: 0, rotateZ: -15, y: 80 });
            gsap.set('.community-cta', { opacity: 0, x: 150, rotateY: -12 });
            gsap.set('.main-footer', { opacity: 0, y: 40 });
            const hasSeenEntrance = sessionStorage.getItem('ge_entrance_seen');
            if (prefersReducedMotion || hasSeenEntrance) {
                clearTimeout(window.__overlayTimeout);
                gsap.set('.entrance-overlay', { autoAlpha: 0, display: 'none' });
                gsap.set(['.main-header', '.hero-badge', '.hero h1', '.hero p'],
                    { clearProps: 'all' });
                gsap.set('.hero-actions .btn', { clearProps: 'all' });
                gsap.set(['.feature-card', '.showcase-slide', '.store-cta',
                    '.price-card', '.community-cta', '.main-footer'],
                    { clearProps: 'all' });
                gsap.to('.hero-badge', {
                    y: -10,
                    duration: 2.5,
                    ease: 'sine.inOut',
                    yoyo: true,
                    repeat: -1,
                });
            } else {
                sessionStorage.setItem('ge_entrance_seen', '1');
                const entrance = gsap.timeline({ delay: 0.2 });
                entrance
                    .to('.entrance-logo', {
                        opacity: 1,
                        duration: 0.7,
                        ease: 'power2.out'
                    })
                    .to('.entrance-scanline', {
                        opacity: 1,
                        top: '0%',
                        duration: 0.6,
                        ease: 'power2.inOut',
                    }, '+=0.2')
                    .to('.entrance-scanline', {
                        top: '100%',
                        duration: 0.6,
                        ease: 'power2.inOut',
                    })
                    .to('.entrance-logo', {
                        x: () => gsap.utils.random(-12, 12),
                        textShadow: '3px 0 #FF1744, -3px 0 #FF6B6B',
                        duration: 0.04,
                        repeat: 10,
                        yoyo: true,
                        ease: 'steps(1)',
                    }, '-=0.4')
                    .set('.entrance-logo', { textShadow: 'none', x: 0 })
                    .to('.entrance-logo', {
                        opacity: 0,
                        scale: 2.5,
                        filter: 'blur(30px)',
                        duration: 0.5,
                        ease: 'power3.in'
                    }, '+=0.1')
                    .to('.entrance-overlay', {
                        clipPath: 'inset(0 0 100% 0)',
                        duration: 1,
                        ease: 'power4.inOut',
                    })
                    .to('.main-header', {
                        yPercent: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power3.out'
                    }, '-=0.5')
                    .to('.hero-badge', {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'back.out(1.7)'
                    }, '-=0.4')
                    .to('.hero h1', {
                        opacity: 1,
                        y: 0,
                        skewY: 0,
                        duration: 1.2,
                        ease: 'power4.out'
                    }, '-=0.5')
                    .to('.hero p', {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out'
                    }, '-=0.6')
                    .to('.hero-actions .btn', {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        stagger: 0.2,
                        duration: 0.7,
                        ease: 'back.out(1.7)'
                    }, '-=0.5')
                    .add(() => {
                        gsap.to('.hero-badge', {
                            y: -10,
                            duration: 2.5,
                            ease: 'sine.inOut',
                            yoyo: true,
                            repeat: -1,
                        });
                    });
            }
            if (typeof SplitType !== 'undefined' && !prefersReducedMotion) {
                document.querySelectorAll('.section-header h2').forEach(h2 => {
                    try {
                        const split = new SplitType(h2, { types: 'words' });
                        gsap.set(split.words, { opacity: 0, y: 60, rotateX: -90, transformOrigin: 'center bottom' });
                        ScrollTrigger.create({
                            trigger: h2.closest('.section-header') || h2,
                            start: 'top 82%',
                            once: true,
                            onEnter: () => {
                                gsap.to(split.words, {
                                    opacity: 1,
                                    y: 0,
                                    rotateX: 0,
                                    duration: 0.9,
                                    stagger: 0.07,
                                    ease: 'back.out(1.4)',
                                });
                            }
                        });
                    } catch(e) {
                        gsap.set(h2, { opacity: 0, y: 30 });
                        ScrollTrigger.create({
                            trigger: h2, start: 'top 82%', once: true,
                            onEnter: () => gsap.to(h2, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
                        });
                    }
                });
                document.querySelectorAll('.section-header p').forEach(p => {
                    gsap.set(p, { opacity: 0, y: 30 });
                    ScrollTrigger.create({
                        trigger: p.closest('.section-header') || p,
                        start: 'top 78%',
                        once: true,
                        onEnter: () => {
                            gsap.to(p, { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power3.out' });
                        }
                    });
                });
            }
            const featureCards = gsap.utils.toArray('.feature-card');
            featureCards.forEach((card, i) => {
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top 88%',
                    once: true,
                    onEnter: () => {
                        gsap.to(card, {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            scale: 1,
                            duration: 1,
                            delay: i * 0.2,
                            ease: 'power3.out',
                        });
                    }
                });
                if (!isMobile) {
                    card.addEventListener('mousemove', (e) => {
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        const rotX = ((y - centerY) / centerY) * -12;
                        const rotY = ((x - centerX) / centerX) * 12;
                        gsap.to(card, {
                            rotateX: rotX,
                            rotateY: rotY,
                            duration: 0.4,
                            ease: 'power2.out',
                            transformPerspective: 800,
                        });
                    });
                    card.addEventListener('mouseleave', () => {
                        gsap.to(card, {
                            rotateX: 0,
                            rotateY: 0,
                            duration: 0.8,
                            ease: 'elastic.out(1, 0.4)',
                        });
                    });
                }
            });
            const sliderEl = document.getElementById('showcaseSlider');
            const slides = gsap.utils.toArray('.showcase-slide');
            if (sliderEl && slides.length === 3) {
                const posConfigs = [
                    { left: '0%',  width: '21%', zIndex: 1, opacity: 0.5,  borderColor: 'rgba(255,255,255,0.04)', boxShadow: 'none' },
                    { left: '23%', width: '54%', zIndex: 3, opacity: 1,    borderColor: 'rgba(255,255,255,0.1)',  boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 50px rgba(255,23,68,0.12)' },
                    { left: '79%', width: '21%', zIndex: 1, opacity: 0.5,  borderColor: 'rgba(255,255,255,0.04)', boxShadow: 'none' },
                ];
                let order = [0, 1, 2];
                let isSliding = false;
                function applyPositions(animate) {
                    const dur = animate ? 0.7 : 0;
                    order.forEach((slideIdx, posIdx) => {
                        const slide = slides[slideIdx];
                        const cfg = posConfigs[posIdx];
                        gsap.to(slide, {
                            left: cfg.left,
                            width: cfg.width,
                            zIndex: cfg.zIndex,
                            opacity: cfg.opacity,
                            y: '-50%',
                            borderColor: cfg.borderColor,
                            boxShadow: cfg.boxShadow,
                            duration: dur,
                            ease: 'power3.inOut',
                            onComplete: () => {
                                if (posIdx === 1) isSliding = false;
                            }
                        });
                        const type = slide.dataset.type;
                        const vid = slide.dataset.vid;
                        const mediaEl = slide.querySelector('.slide-media');
                        const playOverlay = slide.querySelector('.slide-play');
                        if (posIdx === 1 && type === 'youtube' && animate) {
                            pauseMusicForVideo();
                            setTimeout(() => {
                                const existingIframe = mediaEl.querySelector('iframe');
                                if (!existingIframe) {
                                    const iframe = document.createElement('iframe');
                                    iframe.src = `https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1&controls=1&fs=1&enablejsapi=1`;
                                    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                                    iframe.allowFullscreen = true;
                                    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
                                    mediaEl.appendChild(iframe);
                                    if (playOverlay) {
                                        playOverlay.style.display = 'none';
                                        playOverlay.style.pointerEvents = 'none';
                                    }
                                    const fsBtn = mediaEl.querySelector('.slide-fullscreen');
                                    if (fsBtn) fsBtn.style.display = 'none';
                                }
                            }, animate ? 400 : 0);
                        } else if (posIdx !== 1 && type === 'youtube') {
                            const existingIframe = mediaEl.querySelector('iframe');
                            if (existingIframe) existingIframe.remove();
                            if (playOverlay) {
                                playOverlay.style.display = '';
                                playOverlay.style.pointerEvents = '';
                                gsap.to(playOverlay, { opacity: 1, duration: 0.3 });
                            }
                            const fsBtn = mediaEl.querySelector('.slide-fullscreen');
                            if (fsBtn) fsBtn.style.display = '';
                        }
                        if (type === 'streamable') {
                            if (posIdx === 1) {
                                const existingSt = mediaEl.querySelector('iframe');
                                if (existingSt) existingSt.remove();
                                const oldOverlay = mediaEl.querySelector('.streamable-click-overlay');
                                if (oldOverlay) oldOverlay.remove();
                                const stFrame = document.createElement('iframe');
                                stFrame.src = `https://streamable.com/e/${vid}?autoplay=1`;
                                stFrame.allow = 'fullscreen; autoplay';
                                stFrame.allowFullscreen = true;
                                mediaEl.insertBefore(stFrame, mediaEl.firstChild);
                                const overlay = document.createElement('div');
                                overlay.className = 'streamable-click-overlay';
                                overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:4;cursor:pointer;';
                                overlay.addEventListener('click', () => {
                                    pauseMusicForVideo();
                                    overlay.remove();
                                }, { once: true });
                                mediaEl.appendChild(overlay);
                            } else if (posIdx !== 1) {
                                const existingSt = mediaEl.querySelector('iframe');
                                if (existingSt) existingSt.remove();
                                const oldOverlay = mediaEl.querySelector('.streamable-click-overlay');
                                if (oldOverlay) oldOverlay.remove();
                                const stFrame = document.createElement('iframe');
                                stFrame.src = `https://streamable.com/e/${vid}?autoplay=0`;
                                stFrame.allow = 'fullscreen';
                                stFrame.allowFullscreen = true;
                                stFrame.style.pointerEvents = 'none';
                                mediaEl.insertBefore(stFrame, mediaEl.firstChild);
                            }
                        }
                        mediaEl.querySelectorAll('iframe').forEach(f => {
                            f.style.pointerEvents = posIdx === 1 ? '' : 'none';
                        });
                    });
                    if (animate) {
                        const centerSlideIdx = order[1];
                        const centerSlide = slides[centerSlideIdx];
                        const centerType = centerSlide ? centerSlide.dataset.type : '';
                        if (centerType === 'youtube') {
                        } else if (centerType !== 'streamable') {
                            resumeMusicAfterVideo();
                        }
                    }
                }
                slides.forEach(slide => {
                    gsap.set(slide, { y: '-50%' });
                });
                ScrollTrigger.create({
                    trigger: sliderEl,
                    start: 'top 85%',
                    once: true,
                    onEnter: () => {
                        slides.forEach((slide, i) => {
                            const cfg = posConfigs[i];
                            gsap.to(slide, {
                                opacity: cfg.opacity,
                                y: '-50%',
                                left: cfg.left,
                                width: cfg.width,
                                zIndex: cfg.zIndex,
                                borderColor: cfg.borderColor,
                                boxShadow: cfg.boxShadow,
                                duration: 1.2,
                                delay: i === 1 ? 0 : 0.3,
                                ease: 'power3.out',
                            });
                        });
                    }
                });
                slides.forEach((slide, i) => {
                    if (slide.dataset.type === 'streamable' && order.indexOf(i) === 1) {
                        const mediaEl = slide.querySelector('.slide-media');
                        const overlay = document.createElement('div');
                        overlay.className = 'streamable-click-overlay';
                        overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:4;cursor:pointer;';
                        overlay.addEventListener('click', () => {
                            pauseMusicForVideo();
                            overlay.remove();
                        }, { once: true });
                        mediaEl.appendChild(overlay);
                    }
                });
                function rotateLeft() {
                    if (isSliding) return;
                    isSliding = true;
                    order = [order[2], order[0], order[1]];
                    applyPositions(true);
                }
                function rotateRight() {
                    if (isSliding) return;
                    isSliding = true;
                    order = [order[1], order[2], order[0]];
                    applyPositions(true);
                }
                slides.forEach(slide => {
                    slide.addEventListener('click', (e) => {
                        if (e.target.closest('.slide-fullscreen')) return;
                        const slideIdx = parseInt(slide.dataset.slide);
                        const posIdx = order.indexOf(slideIdx);
                        if (posIdx === 0) rotateLeft();
                        else if (posIdx === 2) rotateRight();
                        else if (posIdx === 1) {
                            const type = slide.dataset.type;
                            const vid = slide.dataset.vid;
                            const mediaEl = slide.querySelector('.slide-media');
                            const playOverlay = slide.querySelector('.slide-play');
                            if (type === 'youtube' && playOverlay && playOverlay.style.display !== 'none') {
                                pauseMusicForVideo();
                                const iframe = document.createElement('iframe');
                                iframe.src = `https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1&controls=1&fs=1&enablejsapi=1`;
                                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                                iframe.allowFullscreen = true;
                                iframe.referrerPolicy = 'strict-origin-when-cross-origin';
                                mediaEl.appendChild(iframe);
                                playOverlay.style.display = 'none';
                                playOverlay.style.pointerEvents = 'none';
                                const fsBtn = mediaEl.querySelector('.slide-fullscreen');
                                if (fsBtn) fsBtn.style.display = 'none';
                            } else if (type === 'streamable') {
                                pauseMusicForVideo();
                            }
                        }
                    });
                });
                document.querySelectorAll('.slide-fullscreen').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (document.fullscreenElement || document.webkitFullscreenElement) {
                            if (document.exitFullscreen) {
                                document.exitFullscreen();
                            } else if (document.webkitExitFullscreen) {
                                document.webkitExitFullscreen();
                            }
                            return;
                        }
                        const slideMedia = btn.closest('.slide-media');
                        if (!slideMedia) return;
                        if (slideMedia.requestFullscreen) {
                            slideMedia.requestFullscreen();
                        } else if (slideMedia.webkitRequestFullscreen) {
                            slideMedia.webkitRequestFullscreen();
                        }
                    });
                });
            }
            ScrollTrigger.create({
                trigger: '.store-cta',
                start: 'top 82%',
                once: true,
                onEnter: () => {
                    gsap.to('.store-cta', {
                        opacity: 1,
                        x: 0,
                        rotateY: 0,
                        duration: 1.2,
                        ease: 'power3.out',
                    });
                }
            });
            ScrollTrigger.create({
                trigger: '.price-card',
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    gsap.to('.price-card', {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        rotateZ: 0,
                        duration: 1,
                        ease: 'back.out(1.7)',
                    });
                }
            });
            ScrollTrigger.create({
                trigger: '.community-cta',
                start: 'top 82%',
                once: true,
                onEnter: () => {
                    gsap.to('.community-cta', {
                        opacity: 1,
                        x: 0,
                        rotateY: 0,
                        duration: 1.2,
                        ease: 'power3.out',
                    });
                }
            });
            ScrollTrigger.create({
                trigger: '.main-footer',
                start: 'top 92%',
                once: true,
                onEnter: () => {
                    gsap.to('.main-footer', {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out'
                    });
                }
            });
            if (!prefersReducedMotion) {
                gsap.to('.hero-content', {
                    y: -200,
                    opacity: 0,
                    scale: 0.9,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.hero',
                        start: 'center center',
                        end: 'bottom top',
                        scrub: true,
                    }
                });
            }
            if (!prefersReducedMotion) {
                gsap.to('.aurora-background', {
                    yPercent: -25,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: document.documentElement,
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: true,
                    }
                });
                gsap.to('.grid-background', {
                    yPercent: -12,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: document.documentElement,
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: true,
                    }
                });
            }
            if (!isMobile) {
                document.querySelectorAll('.btn').forEach(btn => {
                    btn.addEventListener('mousemove', (e) => {
                        const rect = btn.getBoundingClientRect();
                        const x = e.clientX - rect.left - rect.width / 2;
                        const y = e.clientY - rect.top - rect.height / 2;
                        gsap.to(btn, {
                            x: x * 0.4,
                            y: y * 0.4,
                            duration: 0.3,
                            ease: 'power2.out',
                        });
                    });
                    btn.addEventListener('mouseleave', () => {
                        gsap.to(btn, {
                            x: 0,
                            y: 0,
                            duration: 0.7,
                            ease: 'elastic.out(1, 0.3)',
                        });
                    });
                });
            }
            const bgCanvas = document.getElementById('background-canvas');
            const bgCtx = bgCanvas.getContext('2d');
            const cursorCanvas = document.getElementById('cursor-canvas');
            const cursorCtx = cursorCanvas.getContext('2d');
            let particles = [], digitalRain = [], cursorParticles = [];
            let mouseX = -200, mouseY = -200;
            const FONT_SIZE = 14;
            function resizeCanvases() {
                bgCanvas.width = cursorCanvas.width = window.innerWidth;
                bgCanvas.height = cursorCanvas.height = window.innerHeight;
            }
            resizeCanvases();
            class FloatingParticle {
                constructor() { this.reset(); }
                reset() {
                    this.x = Math.random() * bgCanvas.width;
                    this.y = Math.random() * bgCanvas.height;
                    this.radius = Math.random() * 1.5 + 0.5;
                    this.speedX = (Math.random() - 0.5) * 0.3;
                    this.speedY = Math.random() * 0.5 + 0.2;
                    this.opacity = Math.random() * 0.4 + 0.1;
                }
                update() {
                    this.y += this.speedY;
                    this.x += this.speedX;
                    if (this.y > bgCanvas.height) { this.reset(); this.y = -10; }
                }
                draw() {
                    bgCtx.beginPath();
                    bgCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    bgCtx.fillStyle = `rgba(255, 23, 68, ${this.opacity})`;
                    bgCtx.fill();
                }
            }
            class RainColumn {
                constructor(x) {
                    this.x = x;
                    this.y = Math.random() * bgCanvas.height;
                    this.chars = 'GAMINGEYES01アイウエオカキクケコ1234567890ABCDEF';
                }
                draw() {
                    const char = this.chars.charAt(Math.floor(Math.random() * this.chars.length));
                    bgCtx.fillStyle = 'rgba(255, 23, 68, 0.07)';
                    bgCtx.font = FONT_SIZE + 'px "JetBrains Mono", monospace';
                    bgCtx.fillText(char, this.x, this.y);
                    if (this.y > bgCanvas.height && Math.random() > 0.975) this.y = 0;
                    this.y += FONT_SIZE;
                }
            }
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
            function initBackground() {
                const isMobileCanvas = window.innerWidth <= 768;
                particles = [];
                for (let i = 0; i < (isMobileCanvas ? 30 : 80); i++) particles.push(new FloatingParticle());
                let columnCount = Math.floor(bgCanvas.width / FONT_SIZE);
                digitalRain = [];
                for (let i = 0; i < columnCount; i++) digitalRain.push(new RainColumn(i * FONT_SIZE));
            }
            function animateBackground() {
                bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
                digitalRain.forEach(col => col.draw());
                particles.forEach(p => { p.update(); p.draw(); });
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
            }
            function masterAnimate() {
                animateBackground();
                animateCursor();
                requestAnimationFrame(masterAnimate);
            }
            window.addEventListener('resize', () => { resizeCanvases(); initBackground(); });
            window.addEventListener('mousemove', (e) => {
                mouseX = e.clientX; mouseY = e.clientY;
                if (cursorParticles.length < 40) {
                    for (let i = 0; i < 2; i++) cursorParticles.push(new CursorParticle());
                }
            });
            initBackground();
            masterAnimate();
            const audioToggle = document.getElementById('audioToggle');
            const bgMusic = document.getElementById('bgMusic');
            const playIcon = document.getElementById('playIcon');
            const pauseIcon = document.getElementById('pauseIcon');
            let isPlaying = false;
            let musicPausedByVideo = false;
            let userWantsMusic = true;
            function updateMusicUI() {
                if (isPlaying) {
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';
                } else {
                    playIcon.style.display = 'block';
                    pauseIcon.style.display = 'none';
                }
            }
            function startMusic() {
                bgMusic.volume = 0.5;
                bgMusic.play().then(() => {
                    isPlaying = true;
                    userWantsMusic = true;
                    updateMusicUI();
                }).catch(e => console.log('Audio play failed:', e));
            }
            function stopMusic() {
                bgMusic.pause();
                isPlaying = false;
                updateMusicUI();
            }
            function pauseMusicForVideo() {
                musicPausedByVideo = true;
                if (isPlaying) {
                    stopMusic();
                }
            }
            function resumeMusicAfterVideo() {
                if (musicPausedByVideo && userWantsMusic) {
                    musicPausedByVideo = false;
                    startMusic();
                }
            }
            audioToggle.addEventListener('click', () => {
                musicPausedByVideo = false;
                if (isPlaying) {
                    userWantsMusic = false;
                    stopMusic();
                } else {
                    userWantsMusic = true;
                    startMusic();
                }
            });
            let hasAutoPlayed = false;
            function tryAutoplayMusic() {
                if (hasAutoPlayed) return;
                hasAutoPlayed = true;
                startMusic();
                document.removeEventListener('click', tryAutoplayMusic);
                document.removeEventListener('scroll', tryAutoplayMusic);
                document.removeEventListener('keydown', tryAutoplayMusic);
                document.removeEventListener('touchstart', tryAutoplayMusic);
            }
            document.addEventListener('click', tryAutoplayMusic);
            document.addEventListener('scroll', tryAutoplayMusic, { once: true });
            document.addEventListener('keydown', tryAutoplayMusic, { once: true });
            document.addEventListener('touchstart', tryAutoplayMusic, { once: true });
        });
