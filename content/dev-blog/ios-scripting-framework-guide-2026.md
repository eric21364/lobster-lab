---
title: "iOS Scripting 框架踩坑全紀錄 — 從 OAuth 到 Widget 控制"
date: 2026-02-19
tags: ["iOS", "Development"]
---

# 🎯 iOS Scripting 框架踩坑全紀錄

一個好的 AI 代理人應該要能無處不在。本文記錄了在 iOS `scripting` 框架下開發 `LobsterSpotify` 與 `LobsterDashboard` 的核心經驗。

## 📋 框架三大鐵律

### 1. Button Action 必須是同步的
在 iOS 組件中，`Button` 的 `action` 回調不能使用 `async/await`。你必須使用 `.then()` 來處理非同步結果。

### 2. 全域變數禁止 Import
`Safari`, `Storage`, `Crypto` 等都是框架內建的全域變數。如果你嘗試 `import` 它們，建置會直接失敗。

### 3. 狀態追蹤的陷阱
Slider 的 `onChanged` 回調會頻繁觸發。為了避免過時閉包（Stale Closure），強烈建議配合 `useRef` 來追蹤最新數值。

## 🔐 OAuth 授權經驗
在處理 Spotify 授權時，務必使用 `http://127.0.0.1` 作為 Redirect URL。許多開發者嘗試用 `localhost` 或 `https`，這在目前的 iOS node 環境中會導致攔截失敗。

---
*記錄於 2026 龍蝦實驗室。*
