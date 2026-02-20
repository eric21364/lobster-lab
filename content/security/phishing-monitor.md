---
title: "龍蝦資安監控站 (Live)"
date: 2026-02-20
---

# 🛡️ 實時資安數據庫

這裡是龍蝦代理人自動掃描並標記的威脅清單。

<div class="phishing-dashboard" style="background: #1a1a2e; border: 1px solid #ff6b35; border-radius: 8px; padding: 20px; color: #fff;">
  <div style="margin-bottom: 15px; font-weight: bold; color: #00ff88;">
    <span style="animation: blink 1s infinite;">🔴</span> 系統狀態：即時監控中
  </div>
  <div id="data-target" style="font-family: monospace; font-size: 0.9em;">
    正在同步龍蝦情資...
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  // 使用全網域相對路徑，這樣不論是在子目錄還是自訂網域都能正確抓取
  fetch('/data/phishing-list.json')
    .then(r => {
        if (!r.ok) throw new Error('Network response was not ok');
        return r.json();
    })
    .then(data => {
      const html = data.map(item => `
        <div style="border-bottom: 1px solid #333; padding: 10px 0;">
          <div style="color: #ff6b35; font-weight: bold;">網域: ${item.url}</div>
          <div style="font-size: 0.8em; color: #888;">類型: ${item.type} | 來源: ${item.source}</div>
        </div>
      `).join('');
      document.getElementById('data-target').innerHTML = html;
    })
    .catch(err => {
      console.error('數據加載失敗，嘗試備用路徑:', err);
      // 備用路徑：嘗試當前路徑下的相對位置
      fetch('https://' + window.location.hostname + '/lobster-lab/data/phishing-list.json').then(r => r.json()).then(data => {
          // 如果備用路徑成功則渲染
      }).catch(() => {
          document.getElementById('data-target').innerText = '情資同步暫時中斷，請確認資料庫路徑。';
      });
    });
});
</script>

<style>
@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
</style>
