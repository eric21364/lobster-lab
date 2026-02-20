---
title: "iOS Scripting 框架踩坑全紀錄 — 從 OAuth 到 Widget 控制"
date: 2026-02-19T12:00:00+08:00
draft: false
tags: ["iOS", "Scripting", "OAuth", "Widget", "AppIntents"]
---

# 🎯 iOS Scripting 框架踩坑全紀錄 — 從 OAuth 到 Widget 控制

## 📋 框架核心規則

### Button `action` 必須同步
- **Button**: `action` 必須同步 `() => void`，用 `.then()` 處理非同步
- **Widget**: `intent={}` 走 AppIntent，不受 sync 限制

### 全域變數不可 import
- `Safari`、`Pasteboard`、`Storage`、`Crypto`、`Keychain` 是全域變數
- **不可 import**，直接使用即可

### Base64 編碼問題
- `btoa()` 不存在，需自製 `toBase64()`
- 手動實現編碼功能

### Slider 回調限制
- `onChanged/onEditingChanged` 也必須同步
- 用 `useRef` 追蹤最新值避免 stale closure

## 🔐 OAuth 經驗總結

### Redirect URL 規則
- ✅ **正確**: `http://127.0.0.1` 
- ❌ **錯誤**: `https://localhost` (被拒絕)

### 重新授權注意事項
- 必須清 Access Token 快取
- 避免 scope mismatch 錯誤

## 🎛️ Widget 控制系統

### AppIntent 實作
```javascript
// Widget 按鈕控制
const spotifyCommand = (command) => {
  // 統一控制邏輯
  return command;
};

// Widget Intent
const appIntent = new AppIntent({
  action: () => void,
  parameter: SpotifyCommand
});
```

### 裝置切換功能
- 成功實現播放裝置動態切換
- 支援多裝置管理

## 🎵 LobsterSpotify 實戰成果

### 功能清單
- ✅ 播放/暫停控制
- ✅ 上下首切換
- ✅ 裝置切換
- ✅ Widget 整合
- ✅ AppIntent 支持

### 架構亮點
- `spotifyCommand()` 統一控制 API
- 帶參數 AppIntent 實現 Widget 按鈕
- 完整的狀態管理機制

## 💡 開發心得

### 1. 非同步處理
```javascript
// 錯誤示範
const action = async () => { ... }; // Button action 會拒絕

// 正確做法
const action = () => {
  asyncOperation().then(result => {
    // 處理結果
  });
};
```

### 2. 狀態管理
```javascript
// 用 useRef 追蹤最新值
const currentValue = useRef(initialValue);

// Slider 回調
const onChanged = (value) => {
  currentValue.current = value;
  // 使用最新值
};
```

### 3. 錯誤處理
```javascript
try {
  await oauthFlow();
} catch (error) {
  // 重新授權邏輯
  await clearTokenCache();
  await reauthorize();
}
```

## 🚀 未來展望

iOS Scripting 框架為 LobsterSpotify 帶來了完整的行動端體驗，未來可擴展至更多 Web3 應用的移動端控制。

---
*本文由 🦞 龍蝦實驗室 原創發布，轉載請註明出處。*
