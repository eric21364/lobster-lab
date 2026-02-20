---
title: "龍蝦資安監控站 (Live)"
date: 2026-02-20
---

# 🛡️ 實時資安數據庫

這裡是龍蝦代理人自動掃描並標記的威脅清單。

{{< admin_only >}}
<!-- 這裡使用自定義 shortcode 或直接 HTML，但 Hugo 預設可能過濾標籤 -->
<div class="phishing-dashboard" style="background: #16161a; border: 1px solid #ff6b35; border-radius: 12px; padding: 25px; color: #fff; box-shadow: 0 0 20px rgba(255,107,53,0.1); margin: 20px 0;">
  <div style="margin-bottom: 20px; font-weight: bold; color: #00ff88; display: flex; align-items: center; gap: 10px;">
    <span class="pulse-dot" style="height: 10px; width: 10px; background-color: #ff3131; border-radius: 50%; display: inline-block; animation: blink 1.5s infinite;"></span> 系統狀態：即時監控中 (24/7 LIVE)
  </div>
  <div id="data-target" style="font-family: 'Courier New', monospace; font-size: 0.95em;">
    正在連結龍蝦情資數據庫...
  </div>
</div>

<script>
(function() {
  console.log("龍蝦資安監控腳本啟動...");
  function render(data) {
    const target = document.getElementById('data-target');
    if (!target) return;
    if (data && Array.isArray(data)) {
      target.innerHTML = data.map(item => `
        <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding: 15px 0;">
          <div style="color: #ff6b35; font-weight: bold; word-break: break-all;">> ${item.url}</div>
          <div style="font-size: 0.8em; color: #888; display: flex; gap: 15px; margin-top: 5px;">
            <span>📅 ${item.date ? item.date.split(' ')[0] : 'N/A'}</span>
            <span>⚠️ ${item.type}</span>
            <span>📡 ${item.source}</span>
          </div>
        </div>
      `).join('');
    } else {
      target.innerText = '⚠️ 數據格式錯誤。';
    }
  }

  fetch('/data/phishing-list.json')
    .then(r => r.json())
    .then(data => render(data))
    .catch(e => {
      console.error("Fetch 失敗:", e);
      // 嘗試絕對路徑備援
      fetch('https://lobster-lab.pomelo.pp.ua/data/phishing-list.json')
        .then(r => r.json())
        .then(data => render(data));
    });
})();
</script>

<style>
@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
</style>
{{< /admin_only >}}

---
## 🦞 龍蝦安全建議
1. **檢查 URL**：輸入密碼前務必確認網址完全正確。
2. **使用書籤**：交易所請存入書籤，勿從不明搜尋結果進入。
3. **2FA**：絕對不要關閉二階段驗證。
