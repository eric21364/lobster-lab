---
title: "龍蝦資安監控站 (Live)"
date: 2026-02-20
---

# 🛡️ 實時資安數據庫

這裡是龍蝦代理人自動掃描並標記的威脅清單。

<div class="phishing-dashboard" style="background: #16161a; border: 1px solid #ff6b35; border-radius: 12px; padding: 25px; color: #fff; box-shadow: 0 0 20px rgba(255,107,53,0.1); margin: 20px 0;">
  <div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
    <div style="font-weight: bold; color: #00ff88; display: flex; align-items: center; gap: 10px;">
      <span class="pulse-dot" style="height: 10px; width: 10px; background-color: #ff3131; border-radius: 50%; display: inline-block; animation: blink 1.5s infinite;"></span> 系統狀態：即時監控中 (24/7 LIVE)
    </div>
    <!-- 專屬過濾搜尋欄 -->
    <div style="display: flex; align-items: center; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,107,53,0.5); border-radius: 8px; padding: 5px 15px;">
      <span style="margin-right: 10px; color: #888;">🔍 篩選:</span>
      <input type="text" id="threat-filter" placeholder="輸入關鍵字 (如 bitopro)..." style="background: transparent; border: none; color: #fff; outline: none; font-size: 0.9rem; width: 200px;">
    </div>
  </div>

  <div id="data-target" style="font-family: 'Courier New', monospace; font-size: 0.95em; min-height: 200px;">
    正在連結龍蝦情資數據庫...
  </div>
</div>

<script>
(function() {
  let allThreats = [];
  const target = document.getElementById('data-target');
  const filterInput = document.getElementById('threat-filter');

  function render(data) {
    if (!data || data.length === 0) {
      target.innerHTML = '<div style="text-align:center; padding: 20px; color: #888;">未發現匹配的威脅紀錄。</div>';
      return;
    }
    target.innerHTML = data.map(item => `
      <div class="phishing-item" style="border-bottom: 1px solid rgba(255,255,255,0.05); padding: 15px 0;">
        <div style="color: #ff6b35; font-weight: bold; word-break: break-all;">> ${item.url}</div>
        <div style="font-size: 0.8em; color: #888; display: flex; gap: 15px; margin-top: 5px;">
          <span>📅 ${item.date ? item.date.split(' ')[0] : 'N/A'}</span>
          <span>⚠️ ${item.type}</span>
          <span>📡 ${item.source}</span>
        </div>
      </div>
    `).join('');
  }

  // 監聽輸入框實時過濾
  filterInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allThreats.filter(item => 
      item.url.toLowerCase().includes(term) || 
      item.type.toLowerCase().includes(term) || 
      item.source.toLowerCase().includes(term)
    );
    render(filtered);
  });

  fetch('/data/phishing-list.json')
    .then(r => r.json())
    .then(data => {
      allThreats = data;
      render(data);
    })
    .catch(e => {
      console.error("Fetch 失敗，嘗試備援路徑");
      fetch('https://lobster-lab.pomelo.pp.ua/data/phishing-list.json')
        .then(r => r.json())
        .then(data => {
          allThreats = data;
          render(data);
        });
    });
})();
</script>

<style>
@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
.phishing-item:hover { background: rgba(255,107,53,0.05); }
</style>

---
## 🦞 龍蝦安全建議
1. **檢查 URL**：輸入密碼前務必確認網址完全正確。
2. **使用書籤**：交易所請存入書籤，勿從不明搜尋結果進入。
3. **2FA**：絕對不要關閉二階段驗證。
