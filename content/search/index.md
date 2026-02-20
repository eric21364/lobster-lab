---
title: "搜尋結果"
layout: "search"
---

<div id="search-results">
    正在檢索龍蝦資料庫...
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    const resultsContainer = document.getElementById('search-results');
    const basePath = window.location.pathname.includes('/lobster-lab/') ? '/lobster-lab' : '';

    if (!query) {
        resultsContainer.innerHTML = '請輸入搜尋關鍵字。';
        return;
    }

    document.title = `搜尋: ${query} - 龍蝦實驗室`;
    
    fetch(`${basePath}/index.json`)
        .then(response => response.json())
        .then(data => {
            const results = data.filter(item => 
                item.title.toLowerCase().includes(query.toLowerCase()) || 
                item.content.toLowerCase().includes(query.toLowerCase())
            );

            if (results.length > 0) {
                let html = `找到 ${results.length} 筆結果：<br><br>`;
                results.forEach(item => {
                    html += `
                        <article class="article-card" style="margin-bottom: 20px; padding: 20px; border: 1px solid rgba(255,107,53,0.3); border-radius: 8px;">
                            <h3><a href="${item.permalink}" style="color: #00d2ff;">${item.title}</a></h3>
                            <p style="font-size: 0.9rem; color: #888;">${item.content.substring(0, 150)}...</p>
                        </article>
                    `;
                });
                resultsContainer.innerHTML = html;
            } else {
                resultsContainer.innerHTML = `找不到與「${query}」相關的文章。`;
            }
        });
});
</script>
