document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // ===== 要素の取得 =====
    const scrollVideo = document.getElementById('scroll-video');
    const secondVideo = document.getElementById('loop-video');
    const contentOverlay = document.querySelector('.content-overlay');

    // ===== 状態管理 =====
    let currentPhase = 1;
    let isVideoEnded = false;

    console.log('🎬 Chapter2 シーケンス開始');

    // ===== フェーズ1: スクロール連動（Scrollytelling） =====
    scrollVideo.addEventListener('loadedmetadata', () => {
        const videoDuration = scrollVideo.duration;
        console.log('📹 動画メタデータ読み込み完了。長さ:', videoDuration, '秒');

        ScrollTrigger.create({
            trigger: '.scroll-container',
            start: 'top top',
            end: '50% top',
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const currentTime = videoDuration * progress;
                scrollVideo.currentTime = Math.round(currentTime * 15) / 15;
                
                if (currentPhase === 1 && progress > 0.01) {
                    console.log('⏩ フェーズ1: スクロール連動中 (' + Math.round(progress * 100) + '%)');
                    currentPhase = 1.5;
                }
            },
            onLeave: () => {
                console.log('✅ フェーズ1 完了: スクロール連動終了');
                currentPhase = 2;
                
                gsap.to(scrollVideo, { 
                    opacity: 0, 
                    duration: 1,
                    onComplete: () => {
                        console.log('🎥 スクロール連動動画フェードアウト完了');
                    }
                });
                
                gsap.to(secondVideo, { 
                    opacity: 1, 
                    duration: 1, 
                    onComplete: () => {
                        console.log('▶️ 第2動画再生開始');
                        secondVideo.play();
                    }
                });
            }
        });
    });

    // ===== 第2動画の終了イベント =====
    secondVideo.addEventListener('ended', () => {
        console.log('🛑 フェーズ2 完了: 第2動画が最後のフレームで停止');
        isVideoEnded = true;
        currentPhase = 3;

        // ===== フェーズ3: ダイナミック・フォーカス発動 =====
        console.log('🌫️ フェーズ3 開始: ダイナミック・フォーカス適用');
        
        gsap.to(secondVideo, {
            duration: 1.5,
            ease: 'power2.inOut',
            onUpdate: function() {
                const progress = this.progress();
                const blurAmount = 8 * progress;
                const brightnessAmount = 1 - (0.4 * progress);
                secondVideo.style.filter = `blur(${blurAmount}px) brightness(${brightnessAmount})`;
            },
            onComplete: () => {
                console.log('✨ フェーズ3 完了: ダイナミック・フォーカス適用完了');
                currentPhase = 4;
                
                // ===== フェーズ4: テキストのフェードイン =====
                console.log('📝 フェーズ4 開始: テキストフェードイン');
                
                gsap.to(contentOverlay, {
                    opacity: 1,
                    duration: 2,
                    ease: 'power2.out',
                    onStart: () => {
                        contentOverlay.style.pointerEvents = 'auto';
                    },
                    onComplete: () => {
                        console.log('🎉 フェーズ4 完了: すべてのシーケンス終了');
                        animateTextElements();
                    }
                });
            }
        });
    });

    // ===== テキスト要素のアニメーション =====
    function animateTextElements() {
        gsap.fromTo('.title', 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }
        );

        gsap.fromTo('.content', 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, delay: 0.6, ease: 'power2.out' }
        );

        console.log('📄 テキストアニメーション開始');
    }

    // ===== デバッグ情報 =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'd' && e.ctrlKey) {
            e.preventDefault();
            console.log('🔍 デバッグ情報:');
            console.log('  現在のフェーズ:', currentPhase);
            console.log('  第2動画終了:', isVideoEnded);
        }
        
        if (e.key === '3' && e.ctrlKey) {
            e.preventDefault();
            console.log('⚡ フェーズ3へ強制スキップ（テスト用）');
            secondVideo.currentTime = secondVideo.duration - 0.1;
            secondVideo.play();
        }
    });
});
