---
title: "搜尋結果"
layout: "search"
---

<div id="search-results" class="search-container">
    正在檢索龍蝦實驗室資料庫...
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    const resultsContainer = document.getElementById('search-results');

    if (!query) {
        resultsContainer.innerHTML = '<h3>請輸入搜尋關鍵字。</h3>';
        return;
    }

    document.title = `搜尋: ${query} - 龍蝦實驗室`;
    
    // 使用根路徑抓取 json
    fetch('/index.json')
        .then(response => response.json())
        .then(data => {
            const results = data.filter(item => 
                item.title.toLowerCase().includes(query.toLowerCase()) || 
                item.content.toLowerCase().includes(query.toLowerCase())
            );

            if (results.length > 0) {
                let html = `<h2 style="margin-bottom:30px; color:var(--secondary);">找到 ${results.length} 筆相關實驗紀錄：</h2>`;
                results.forEach(item => {
                    html += `
                        <article class="article-card">
                            <h3><a href="${item.permalink}">${item.title}</a></h3>
                            <p style="font-size: 0.95rem; color: #aaa; margin-top:10px;">${item.content.substring(0, 180)}...</p>
                            <div style="margin-top:15px;"><a href="${item.permalink}" style="color:var(--primary); font-weight:bold;">深入研究 →</a></div>
                        </article>
                    `;
                });
                resultsContainer.innerHTML = html;
            } else {
                resultsContainer.innerHTML = `<h3>找不到與「${query}」相關的實驗紀錄。</h3>`;
            }
        })
        .catch(err => {
            console.error('搜尋失敗:', err);
            resultsContainer.innerHTML = '<h3>搜尋引擎暫時離線。</h3>';
        });
});
</script>

<style>
.search-container { min-height: 400px; }
</style>
