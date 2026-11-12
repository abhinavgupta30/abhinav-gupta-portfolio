
                        document.addEventListener("DOMContentLoaded", () => {
                            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                            // Accessibility: Global Reduced Motion for GSAP
                            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                                gsap.ticker.fps(15); // Reduce frame rate to minimize jarring movement
                            }

                                const midnightCards = (() => {
                                    const cards = [
                                        ['git commit', 'works at 12:47 AM', '#22D3EE'], ['YOLOv8', 'weapon detection', '#FF2E93'], ['Spendly', 'coffee 120 logged', '#22D3EE'],
                                        ['Bank Churn', 'live on Streamlit', '#FF2E93'], ['ISKCON', 'finance system', '#22D3EE'], ['Lost N Found', 'Android + Firebase', '#FF2E93'],
                                        ['FastAPI', 'ship it', '#22D3EE'], ['Next.js 14', 'forensic UI', '#FF2E93'], ['sleep.exe', 'has stopped responding', '#22D3EE'],
                                        ['00:00', 'peak performance', '#FF2E93'], ['Python', 'C++ \u00b7 Java \u00b7 OOPs', '#22D3EE'], ['Research', '3+ papers', '#FF2E93']
                                    ];
                                    return cards.map(([a, b, c], i) => {
                                        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320"><rect width="480" height="320" fill="#060b16"/><rect x="0" y="0" width="480" height="34" fill="#0d1526"/><circle cx="20" cy="17" r="6" fill="#FF2E93"/><circle cx="40" cy="17" r="6" fill="#22D3EE"/><circle cx="60" cy="17" r="6" fill="#334155"/><text x="24" y="150" font-family="monospace" font-size="${a.length > 10 ? 38 : 50}" font-weight="700" fill="${c}">${a}</text><text x="24" y="196" font-family="monospace" font-size="22" fill="#cbd5e1">${b}</text><rect x="24" y="232" width="${120 + (i * 37) % 260}" height="8" fill="${c}" opacity=".7"/><rect x="24" y="252" width="${80 + (i * 53) % 220}" height="8" fill="#334155"/><rect x="24" y="272" width="${150 + (i * 29) % 200}" height="8" fill="#1e293b"/></svg>`;
                                        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
                                    });
                                })();
                                
                                const canvas = document.getElementById("cursor-trail-canvas");
                                let imgIndex = 0;
                                let lastX = 0;
                                let lastY = 0;
                                const threshold = 180; // pixels to move before spawning next image
                                const activeImages = [];

                                const onGalleryMouseMove = (e) => {
                                    if (window.innerWidth < 768) return;
                                    const rect = canvas.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;

                                    const dist = Math.hypot(x - lastX, y - lastY);
                                    if (dist > threshold) {
                                        lastX = x;
                                        lastY = y;
                                        spawnImage(x, y);
                                    }
                                };

                                const gallerySection = document.getElementById("gallery");
                                new IntersectionObserver((entries) => {
                                    entries.forEach(entry => {
                                        if (entry.isIntersecting) {
                                            canvas.addEventListener("mousemove", onGalleryMouseMove);
                                        } else {
                                            canvas.removeEventListener("mousemove", onGalleryMouseMove);
                                        }
                                    });
                                }, { threshold: 0 }).observe(gallerySection);

                                function spawnImage(x, y) {
                                    if (typeof isAudioInit !== 'undefined' && isAudioInit && typeof boingSynth !== 'undefined') {
                                        // Slight pop sound with very short release
                                        boingSynth.triggerAttackRelease("G5", "64n", "+0", 0.05);
                                    }

                                    const src = midnightCards[imgIndex];
                                    imgIndex = (imgIndex + 1) % midnightCards.length;

                                    const img = document.createElement("img");
                                    img.src = src;
                                    
                                    const baseWidth = window.innerWidth < 768 ? 160 : window.innerWidth <= 1440 ? 240 : 320;
                                    const scale = 0.7 + Math.random() * 0.4; // 0.7x to 1.1x scale
                                    const rot = (Math.random() - 0.5) * 15; // More varied rotation
                                    const offsetX = (Math.random() - 0.5) * Math.min(200, window.innerWidth * 0.12); // Imperfect placement
                                    const offsetY = (Math.random() - 0.5) * Math.min(200, window.innerWidth * 0.12);
                                    
                                    img.className = "absolute origin-center rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] pointer-events-none will-change-transform";
                                    img.style.width = `${baseWidth}px`;
                                    img.style.left = `${x + offsetX}px`;
                                    img.style.top = `${y + offsetY}px`;
                                    img.style.transform = `translate(-50%, -50%) scale(0.9) rotate(${rot - 5}deg)`;
                                    img.style.opacity = "0";

                                    canvas.appendChild(img);
                                    activeImages.push(img);

                                    // Appear slowly with a pause (delay) matching the vibe
                                    gsap.to(img, {
                                        opacity: 1,
                                        scale: scale,
                                        rotation: rot,
                                        duration: 1.5,
                                        delay: Math.random() * 0.3 + 0.1, // bit pause
                                        ease: "power2.out",
                                        overwrite: "auto"
                                    });

                                    // Enforce a higher max images to allow a tiled look
                                    if (activeImages.length > 15) {
                                        const oldImg = activeImages.shift();
                                        removeImage(oldImg);
                                    }

                                    // Auto fade out (longer duration so they tile up)
                                    setTimeout(() => {
                                        if (activeImages.includes(img)) {
                                            const idx = activeImages.indexOf(img);
                                            if (idx > -1) activeImages.splice(idx, 1);
                                            removeImage(img);
                                        }
                                    }, 3500);
                                }

                                function removeImage(img) {
                                    gsap.to(img, {
                                        opacity: 0,
                                        scale: 0.8,
                                        duration: 0.8,
                                        ease: "power2.inOut",
                                        onComplete: () => {
                                            if (img.parentNode) {
                                                img.parentNode.removeChild(img);
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    