document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // 動画要素の取得
    const scrollVideo = document.getElementById('scroll-video');
    const loopVideo = document.getElementById('loop-video');
    const contentOverlay = document.querySelector('.content-overlay');

    // 動画のメタデータ読み込み完了を待つ
    // loadedmetadataイベント: 動画のduration（長さ）が取得できるようになるタイミング
    // これを待たないとスクロール量とのマッピングがズレてしまう
    scrollVideo.addEventListener('loadedmetadata', () => {
        const videoDuration = scrollVideo.duration; // 動画の長さ（秒）を取得

        // ScrollTriggerの初期化: スクロール連動動画の制御
        ScrollTrigger.create({
            trigger: '.scroll-container', // トリガー要素
            start: 'top top', // スクロール開始位置
            end: '50% top', // スクロール中間地点で動画スクラブ終了
            scrub: true, // スクロール位置と動画再生位置を連動
            onUpdate: (self) => {
                // スクロール進行度（0.0 ~ 1.0）に応じて動画の再生位置を更新
                const progress = self.progress;
                const currentTime = videoDuration * progress;

                // フレームレートに合わせて丸める（15fps → 1/15秒単位）
                // これにより、currentTimeの細かい変動によるチラつき（Flicker）を抑制
                scrollVideo.currentTime = Math.round(currentTime * 15) / 15;
            },
            onLeave: () => {
                // スクロールが中間地点に到達したときの処理
                // スクロール連動動画をフェードアウト
                gsap.to(scrollVideo, { 
                    opacity: 0, 
                    duration: 1 
                });
                
                // ループ動画をフェードインして再生開始（その場で切り替え）
                gsap.to(loopVideo, { 
                    opacity: 1, 
                    duration: 1, 
                    onComplete: () => loopVideo.play() // フェードイン完了後に再生
                });

                // テキストコンテンツをフェードイン（動画の上に重ねて表示）
                gsap.to(contentOverlay, {
                    opacity: 1,
                    duration: 1.5,
                    delay: 0.5,
                    onStart: () => {
                        contentOverlay.style.pointerEvents = 'auto'; // クリック可能にする
                    }
                });
            }
        });
    });

    // タイトルアニメーション
    gsap.to('.title', {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'power2.out'
    });

    // サブタイトルアニメーション
    gsap.to('.subtitle', {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        delay: 0.5
    });

    // コンテンツアニメーション
    gsap.to('.content', {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        delay: 1,
        stagger: 0.3
    });

    // プロフィールアニメーション
    gsap.to('.profile', {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        delay: 2
    });
});