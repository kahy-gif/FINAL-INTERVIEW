document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const scrollVideo = document.getElementById("scroll-video");
    const loopVideo = document.getElementById("loop-video");

    // 動画のメタデータ読み込み完了を待つ
    scrollVideo.addEventListener("loadedmetadata", () => {
        const videoDuration = scrollVideo.duration; // 動画の長さを取得

        // ScrollTriggerの初期化
        ScrollTrigger.create({
            trigger: ".video-container", // トリガー要素
            start: "top top", // スクロール開始位置
            end: `+=${window.innerHeight * 2}`, // スクロール終了位置
            scrub: true, // スクロール連動
            pin: true, // 固定
            onUpdate: (self) => {
                // スクロール進行度に応じて動画の再生位置を更新
                const progress = self.progress; // 0.0 ~ 1.0
                const currentTime = videoDuration * progress;

                // フレームレートに合わせて丸める（15fps）
                scrollVideo.currentTime = Math.round(currentTime * 15) / 15;
            },
            onLeave: () => {
                // スクロール終了時の処理
                gsap.to(scrollVideo, { opacity: 0, duration: 1 }); // フェードアウト
                gsap.to(loopVideo, { opacity: 1, duration: 1, onComplete: () => loopVideo.play() }); // ループ動画を再生
            },
        });
    });

    // 初期状態でループ動画を非表示に
    loopVideo.style.opacity = 0;
});