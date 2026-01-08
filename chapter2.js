document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const scrollVideo = document.getElementById('scroll-video');
    const loopVideo = document.getElementById('loop-video');
    const contentOverlay = document.querySelector('.content-overlay');

    // 章タイトルアニメーション
    gsap.to('.chapter-title', {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'power2.out'
    });

    // セクションアニメーション
    gsap.to('.section', {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        delay: 0.5
    });

    // ダイアログアニメーション
    gsap.to('.dialogue', {
        duration: 0.8,
        opacity: 1,
        x: 0,
        ease: 'power2.out',
        delay: 1,
        stagger: 0.2
    });

    // スクロールトリガー
    gsap.to('#chapter2', {
        scrollTrigger: {
            trigger: '#chapter2',
            start: 'top center',
            end: 'bottom center',
            scrub: true
        },
        backgroundColor: '#fde8e8'
    });

    scrollVideo.addEventListener('loadedmetadata', () => {
        const videoDuration = scrollVideo.duration;

        ScrollTrigger.create({
            trigger: '.scroll-container',
            start: 'top top',
            end: '50% top',
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const currentTime = videoDuration * progress;
                scrollVideo.currentTime = Math.round(currentTime * 15) / 15;
            },
            onLeave: () => {
                gsap.to(scrollVideo, { 
                    opacity: 0, 
                    duration: 1 
                });
                gsap.to(loopVideo, { 
                    opacity: 1, 
                    duration: 1, 
                    onComplete: () => loopVideo.play()
                });
                gsap.to(contentOverlay, {
                    opacity: 1,
                    duration: 1.5,
                    delay: 0.5,
                    onStart: () => {
                        contentOverlay.style.pointerEvents = 'auto';
                    }
                });
            }
        });
    });

    gsap.to('.title', {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'power2.out'
    });

    gsap.to('.content', {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        delay: 1,
        stagger: 0.3
    });
});