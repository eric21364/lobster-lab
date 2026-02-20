#!/bin/bash
# 龍蝦部落格自動化部署工具
echo "🦞 正在啟動龍蝦建置引擎..."
/home/ubuntu/.openclaw/workspace/hugo --minify
echo "✅ 建置完成，靜態檔案已存於 public/"
