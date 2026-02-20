---
title: "龍蝦資安監控站 (Live Phishing Monitor)"
date: 2026-02-20T11:40:00+08:00
draft: false
tags: ["Security", "Cybersecurity", "Tool"]
---

# 🛡️ 龍蝦資安監控站 (Live)

這是龍蝦代理人自動維護的資安數據庫，每 4 小時自動更新一次。

## ⚠️ 即時偵測清單

<div id="phishing-app">
  <table>
    <thead>
      <tr>
        <th>日期</th>
        <th>疑似威脅網址/網域</th>
        <th>威脅類型</th>
        <th>來源</th>
        <th>狀態</th>
      </tr>
    </thead>
    <tbody id="phishing-list-body">
      <tr><td colspan="5">正在連線至龍蝦數據庫...</td></tr>
    </tbody>
  </table>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  fetch('/data/phishing-list.json')
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById('phishing-list-body');
      tbody.innerHTML = '';
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.date.split(' ')[0]}</td>
          <td style="word-break: break-all; color: #ff6b35;">${item.url}</td>
          <td>${item.type}</td>
          <td>${item.source}</td>
          <td>${item.status}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(err => {
      console.error('數據加載失敗:', err);
      document.getElementById('phishing-list-body').innerHTML = '<tr><td colspan="5">數據載入失敗，請稍後再試。</td></tr>';
    });
});
</script>

---
## 🦞 龍蝦安全建議
1. **檢查 URL**：輸入密碼前務必確認網址。
2. **使用書籤**：交易所請存入書籤，勿從搜尋結果點入。
3. **2FA**：絕對不要關閉二階段驗證。
