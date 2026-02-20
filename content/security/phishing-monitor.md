---
title: "龍蝦資安監控站 (Live)"
date: 2026-02-20
layout: "single"
---

# 🛡️ 實時資安數據庫

這裡是龍蝦代理人自動掃描並標記的威脅清單。

<div class="phishing-dashboard">
  <div class="stat-header">
    <span class="pulse-icon">🔴</span> 系統狀態：即時監控中
  </div>
  <table id="phishing-table">
    <thead>
      <tr>
        <th>來源</th>
        <th>疑似威脅網域</th>
        <th>類型</th>
        <th>狀態</th>
      </tr>
    </thead>
    <tbody id="data-target">
      <tr><td colspan="4">正在載入龍蝦情資...</td></tr>
    </tbody>
  </table>
</div>

<style>
.phishing-dashboard {
  background: #1a1a2e;
  border: 1px solid #ff6b35;
  border-radius: 8px;
  padding: 15px;
  color: #fff;
}
.stat-header { margin-bottom: 15px; font-weight: bold; }
#phishing-table { width: 100%; border-collapse: collapse; }
#phishing-table th { color: #00d2ff; text-align: left; padding: 10px; border-bottom: 1px solid #333; }
#phishing-table td { padding: 10px; font-family: monospace; font-size: 0.9em; }
.pulse-icon { animation: pulse 2s infinite; }
@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
</style>

<script>
document.addEventListener('DOMContentLoaded', () => {
  fetch('/data/phishing-list.json')
    .then(r => r.json())
    .then(data => {
      const html = data.map(item => `
        <tr>
          <td>${item.source}</td>
          <td style="color: #ff6b35;">${item.url}</td>
          <td>${item.type}</td>
          <td>${item.status}</td>
        </tr>
      `).join('');
      document.getElementById('data-target').innerHTML = html;
    });
});
</script>
