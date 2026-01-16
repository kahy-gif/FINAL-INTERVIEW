document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

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
        delay: 0.5,
        stagger: 0.5
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

    // 物語（narrative）アニメーション
    gsap.to('.narrative', {
        duration: 0.8,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        delay: 1,
        stagger: 0.15
    });
    // スクロールトリガー
    gsap.to('#current_future', {
        scrollTrigger: {
            trigger: '#current_future',
            start: 'top center',
            end: 'bottom center',
            scrub: true
        },
        backgroundColor: '#d4edda'
    });
});
