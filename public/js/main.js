console.log("🦞 龍蝦實驗室系統已啟動...");

// 可以在這裡添加一些 Cyberpunk 視覺特效，例如隨機的文字閃爍
document.addEventListener('DOMContentLoaded', () => {
    const brand = document.querySelector('.brand-title');
    if (brand) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                brand.style.textShadow = "0 0 10px #ff6b35, 0 0 20px #ff6b35";
                setTimeout(() => {
                    brand.style.textShadow = "none";
                }, 100);
            }
        }, 500);
    }
});
