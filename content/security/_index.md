---
title: "龍蝦資安監控站 (Live)"
date: 2026-02-20
---

# 🛡️ 實時資安數據庫

這裡是龍蝦代理人自動掃描並標記的威脅清單。

<div class="phishing-dashboard" style="background: #16161a; border: 1px solid #ff6b35; border-radius: 12px; padding: 25px; color: #fff; box-shadow: 0 0 20px rgba(255,107,53,0.1); margin: 30px 0;">
  <div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
    <div style="font-weight: bold; color: #00ff88; display: flex; align-items: center; gap: 10px;">
      <span class="pulse-dot" style="height: 10px; width: 10px; background-color: #ff3131; border-radius: 50%; display: inline-block; animation: blink 1.5s infinite;"></span> 系統狀態：即時監控中 (24/7 LIVE)
    </div>
    <div style="display: flex; align-items: center; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,107,53,0.5); border-radius: 8px; padding: 5px 15px;">
      <span style="margin-right: 10px; color: #888;">🔍 篩選:</span>
      <input type="text" id="threat-filter" placeholder="輸入網址或關鍵字..." style="background: transparent; border: none; color: #fff; outline: none; font-size: 0.9rem; width: 180px;">
    </div>
  </div>

  <div id="data-scroll-container" style="max-height: 500px; overflow-y: auto; padding-right: 10px; scrollbar-width: thin; scrollbar-color: #ff6b35 #16161a;">
    <div id="data-target" style="font-family: 'Courier New', monospace; font-size: 0.95em;">
      正在連結龍蝦情資數據庫...
    </div>
  </div>
</div>

<hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 40px 0;">

<div class="security-advice" style="padding-left: 10px;">
  <h2 style="color: #ff6b35; border-left: 4px solid #ff6b35; padding-left: 15px; margin-bottom: 25px;">🦞 龍蝦安全建議</h2>
  <ul style="list-style: decimal; padding-left: 30px; line-height: 2.2; color: #d0d0d0;">
    <li style="margin-bottom: 15px; padding-left: 10px;"><strong>檢查 URL</strong>：輸入密碼前務必確認網址完全正確。</li>
    <li style="margin-bottom: 15px; padding-left: 10px;"><strong>使用書籤</strong>：將常用交易所存入書籤，避免從 Google 搜尋結果進入。</li>
    <li style="margin-bottom: 15px; padding-left: 10px;"><strong>2FA</strong>：絕對不要關閉二階段驗證。</li>
    <li style="margin-bottom: 15px; padding-left: 10px;"><strong>影子錢包</strong>：執行不明任務時，務必使用物理隔離的測試錢包。</li>
  </ul>
</div>

<style>
#data-scroll-container::-webkit-scrollbar { width: 6px; }
#data-scroll-container::-webkit-scrollbar-track { background: #16161a; }
#data-scroll-container::-webkit-scrollbar-thumb { background: #ff6b35; border-radius: 10px; }
@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
</style>

<script>
(function() {
  let allThreats = [];
  const target = document.getElementById('data-target');
  const filterInput = document.getElementById('threat-filter');

  function render(data) {
    if (!data || data.length === 0) {
      target.innerHTML = '<div style="text-align:center; padding: 40px; color: #888;">[ 無匹配威脅紀錄 ]</div>';
      return;
    }
    target.innerHTML = data.map(item => `
      <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding: 15px 0;">
        <div style="color: #ff6b35; font-weight: bold; word-break: break-all; margin-bottom: 5px;">> ${item.url}</div>
        <div style="font-size: 0.8em; color: #888; display: flex; gap: 15px; flex-wrap: wrap;">
          <span>📅 ${item.date ? item.date.split(' ')[0] : 'N/A'}</span>
          <span style="color: #00d2ff;">⚠️ ${item.type}</span>
          <span>📡 來源: ${item.source}</span>
          <span style="color: ${String(item.status).includes('ACTIVE') ? '#ff3131' : '#00ff88'}">${item.status}</span>
        </div>
      </div>
    `).join('');
  }

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
    .catch(() => {
      document.getElementById('data-target').innerText = '情資同步中斷，請重新整理頁面。';
    });
})();
</script>
