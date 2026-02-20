---
title: "搜尋結果"
layout: "search"
outputs: ["HTML"]
---

<div id="search-results">
    正在檢索資料庫...
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    const resultsContainer = document.getElementById('search-results');

    if (!query) {
        resultsContainer.innerHTML = '請輸入搜尋關鍵字。';
        return;
    }

    // 更新頁面標題
    document.title = `搜尋: ${query} - 龍蝦實驗室`;
    
    // 獲取所有文章的 JSON (利用 Hugo 的 JSON 輸出)
    fetch('/index.json')
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
                        <article class="article-card">
                            <h3><a href="${item.permalink}">${item.title}</a></h3>
                            <p>${item.content.substring(0, 150)}...</p>
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
