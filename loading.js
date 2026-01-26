// ローディング画面の制御
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const videos = document.querySelectorAll('video');
    let videosLoaded = 0;
    const totalVideos = videos.length;

    function checkAllVideosLoaded() {
        videosLoaded++;
        if (videosLoaded >= totalVideos) {
            // すべての動画が読み込まれたらローディング画面をフェードアウト
            setTimeout(() => {
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
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }
    }, 5000);
});
