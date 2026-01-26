// ローディング画面の制御
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingDots = document.querySelector('.loading-dots');
    const videos = document.querySelectorAll('video');
    let videosLoaded = 0;
    const totalVideos = videos.length;
    let dotCount = 0;

    // 「。」を0,1,2,3個と表示するアニメーション
    function animateDots() {
        const dots = '。'.repeat(dotCount);
        loadingDots.textContent = dots;
        dotCount = (dotCount + 1) % 4; // 0, 1, 2, 3, 0, 1, 2, 3...
    }

    // 初回表示
    animateDots();
    
    // 500msごとにドットを更新
    const dotInterval = setInterval(animateDots, 500);

    function checkAllVideosLoaded() {
        videosLoaded++;
        if (videosLoaded >= totalVideos) {
            // すべての動画が読み込まれたらローディング画面をフェードアウト
            setTimeout(() => {
                clearInterval(dotInterval); // ドットアニメーション停止
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 800); // フェードアウトの時間と合わせる
            }, 300); // 少し余裕を持たせる
        }
    }

    // 各動画の読み込み完了を監視
    videos.forEach(video => {
        if (video.readyState >= 3) {
            // すでに読み込まれている場合
            checkAllVideosLoaded();
        } else {
            // 読み込み完了を待つ
            video.addEventListener('canplaythrough', checkAllVideosLoaded, { once: true });
            // エラー時も処理を続行
            video.addEventListener('error', checkAllVideosLoaded, { once: true });
        }
    });

    // フォールバック: 5秒経過したら強制的にローディング画面を非表示
    setTimeout(() => {
        if (loadingScreen.style.display !== 'none') {
            clearInterval(dotInterval); // ドットアニメーション停止
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }
    }, 5000);
});
