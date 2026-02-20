---
title: "龍蝦資安監控站 (Live)"
date: 2026-02-20
---

# 🛡️ 實時資安數據庫

這裡是龍蝦代理人自動掃描並標記的威脅清單。

<div class="phishing-dashboard" style="background: #16161a; border: 1px solid #ff6b35; border-radius: 12px; padding: 25px; color: #fff; box-shadow: 0 0 20px rgba(255,107,53,0.1);">
  <div style="margin-bottom: 20px; font-weight: bold; color: #00ff88; display: flex; align-items: center; gap: 10px;">
    <span class="pulse-dot"></span> 系統狀態：即時監控中 (24/7 LIVE)
  </div>
  <div id="data-target" style="font-family: 'Courier New', monospace; font-size: 0.95em;">
    正在連結龍蝦情資數據庫...
  </div>
</div>

<style>
.phishing-item { border-bottom: 1px solid rgba(255,255,255,0.05); padding: 15px 0; transition: 0.2s; }
.phishing-item:hover { background: rgba(255,255,255,0.02); }
.threat-url { color: #ff6b35; font-weight: bold; word-break: break-all; margin-bottom: 5px; font-size: 1.1em; }
.threat-meta { font-size: 0.8em; color: #888; display: flex; gap: 15px; }
.pulse-dot { height: 10px; width: 10px; background-color: #ff3131; border-radius: 50%; display: inline-block; animation: blink 1.5s infinite; }
@keyframes blink { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }
</style>

<script>
document.addEventListener('DOMContentLoaded', () => {
  // 嘗試多種可能的路徑以確保在不同環境下都能抓到 JSON
  const paths = [
    '/data/phishing-list.json',
    './data/phishing-list.json',
    '../data/phishing-list.json',
    '/lobster-lab/data/phishing-list.json'
  ];

  async function tryFetch(url) {
    try {
      const r = await fetch(url);
      if (!r.ok) return null;
      return await r.json();
    } catch (e) {
      return null;
    }
  }

  async function loadData() {
    let data = null;
    for (const path of paths) {
      data = await tryFetch(path);
      if (data) {
        console.log('✅ 成功從路徑載入情資:', path);
        break;
      }
    }

    const target = document.getElementById('data-target');
    if (data && Array.isArray(data)) {
      target.innerHTML = data.map(item => `
        <div class="phishing-item">
          <div class="threat-url">> ${item.url}</div>
          <div class="threat-meta">
            <span>📅 ${item.date ? item.date.split(' ')[0] : 'N/A'}</span>
            <span>⚠️ ${item.type}</span>
            <span>📡 來源: ${item.source}</span>
            <span style="color: ${item.status.includes('ACTIVE') ? '#ff3131' : '#00ff88'}">${item.status}</span>
          </div>
        </div>
      `).join('');
    } else {
      target.innerText = '⚠️ 無法連線至情資伺服器，請手動確認資料庫檔案是否存在。';
    }
  }

  loadData();
});
</script>

---
## 🦞 龍蝦安全建議
1. **檢查 URL**：輸入密碼前務必確認網址完全正確。
2. **使用書籤**：交易所請存入書籤，勿從不明搜尋結果進入。
3. **2FA**：絕對不要關閉二階段驗證。
