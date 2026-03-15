<p align="center">
  <img src="assets/drop-it-logo.svg" width="200" alt="DropItLikeItsHot Logo"/>
</p>

<h1 align="center">🔥 DropItLikeItsHot 🔥</h1>

<p align="center">
  <strong>"10번째 대화인데 아직도 드래그앤드롭이 안 돼요" 증후군 치료제</strong>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/vibe--coding-救急箱-ff6b6b?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+PHBhdGggZD0iTTEyIDJMNCAyMGgyMEwxMiAyeiIvPjwvc3ZnPg==" alt="Vibe Coding First Aid"/></a>
  <a href="#"><img src="https://img.shields.io/badge/drag%20%26%20drop-SOLVED-00d2ff?style=for-the-badge" alt="Drag & Drop Solved"/></a>
  <a href="#"><img src="https://img.shields.io/badge/copy%20%26%20paste-ready-7c3aed?style=for-the-badge" alt="Copy & Paste Ready"/></a>
  <a href="#"><img src="https://img.shields.io/badge/AI%20tested-battle--proven-f59e0b?style=for-the-badge" alt="AI Battle Proven"/></a>
</p>

<p align="center">
  <code>VSCode</code> · <code>Cursor</code> · <code>Windsurf</code> · <code>Terminal</code> · <code>Claude Code</code> · <code>Copilot</code>
</p>

---

## 😤 이런 경험 있으시죠?

```
나: "드래그앤드롭 파일 업로드 만들어줘"
AI: "네! 완성입니다 ✨"
나: *파일 끌어다 놓음*
나: ...
나: 아무 반응 없음
나: "안 되는데?"
AI: "아 죄송합니다! preventDefault가 빠졌네요!"
나: *다시 시도*
나: 여전히 안 됨
AI: "stopPropagation도 추가했습니다!"
나: *10번째 대화*
나: "왜!!!!! 안!!!!!! 돼!!!!!!!"
```

**DropItLikeItsHot**은 바로 그 순간을 위해 만들어졌습니다.

AI한테 10번 말해도 안 되는 드래그앤드롭,
여기서 **복붙 한 번**이면 끝납니다. 🎤⬇️

---

## 🎯 이게 뭔데요?

바이브코딩(Vibe Coding)하다가 **드래그앤드롭에서 막힌 사람들**을 위한 복붙용 레퍼런스입니다.

실제로 프로덕션에서 돌아가고 있는 코드에서 추출했습니다.
이론이 아니라 **실전에서 검증된 패턴**입니다.

### 포함된 내용

| 패턴 | 설명 | 파일 |
|------|------|------|
| 🎵 **파일 드롭** | 오디오/이미지 등 파일 드래그앤드롭 | `patterns/file-drop.jsx` |
| 📂 **폴더 선택** | 폴더 통째로 선택해서 파일 일괄 추가 | `patterns/folder-select.jsx` |
| 🎯 **드롭존 + 버튼 콤보** | 드래그앤드롭 + 파일선택 + 폴더선택 3종 세트 | `patterns/combo-upload.jsx` |
| 💾 **IndexedDB 저장** | 대용량 파일을 브라우저에 저장 | `patterns/indexeddb-storage.jsx` |
| 🛡️ **모달 드래그 버그 수정** | 텍스트 드래그하면 모달 닫히는 문제 해결 | `patterns/modal-drag-fix.jsx` |
| 📦 **백업/복원** | IndexedDB 데이터 JSON 백업 & 복원 | `patterns/backup-restore.jsx` |
| ⬇️ **스마트 다운로드** | 파일명 자동 포맷팅 다운로드 | `patterns/smart-download.jsx` |

---

## 🚀 30초 퀵스타트

### 1. 가장 기본적인 드롭존

```jsx
// 이것만 복붙하세요. 진짜로. 이게 끝입니다.
const DropZone = ({ onFilesDropped }) => {
  const [isDragOver, setIsDragOver] = React.useState(false);

  return (
    <div
      style={{
        border: `2px dashed ${isDragOver ? '#f59e0b' : '#4b5563'}`,
        borderRadius: '16px',
        padding: '40px',
        textAlign: 'center',
        background: isDragOver ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
        transition: 'all 0.2s ease',
      }}
      // 🔥 이 4개가 핵심입니다. 하나라도 빠지면 안 됩니다.
      onDragOver={(e) => {
        e.preventDefault();      // ← 이거 없으면 드롭 자체가 안 됨
        e.stopPropagation();     // ← 이거 없으면 부모가 이벤트 가로챔
        setIsDragOver(true);
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
      }}
      onDragLeave={(e) => {
        e.stopPropagation();
        // ← 자식 요소 드나들 때 깜빡임 방지
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsDragOver(false);
        }
      }}
      onDrop={(e) => {
        e.preventDefault();      // ← 이거 없으면 브라우저가 파일을 열어버림
        e.stopPropagation();
        setIsDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        onFilesDropped(files);
      }}
    >
      <p>{isDragOver ? '🔥 놓으세요!' : '📁 파일을 여기에 드래그하세요'}</p>
    </div>
  );
};
```

### 2. 왜 안 됐는지 한눈에 보기

```
❌ 안 되는 코드                    ✅ 되는 코드
─────────────────────             ─────────────────────
onDrop={(e) => {                  onDrop={(e) => {
                                    e.preventDefault();  ← 필수!
                                    e.stopPropagation(); ← 필수!
  handleDrop(e);                    handleDrop(e);
}}                                }}

onDragOver 없음                   onDragOver={(e) => {
                                    e.preventDefault();  ← 이게 없으면
                                  }}                       드롭 불가!
```

---

## 🧩 패턴별 상세 가이드

### 패턴 1: 파일 + 폴더 + 드래그 3종 콤보

AI한테 "파일 업로드 만들어줘"라고 하면 보통 하나만 됩니다.
실제로는 **3가지 다 필요합니다:**

```jsx
// 🎯 ref 2개 필요합니다 (파일용, 폴더용)
const fileInputRef = React.useRef(null);
const folderInputRef = React.useRef(null);

// 버튼 영역
<div style={{ display: 'flex', gap: '12px' }}>
  {/* 드롭존 */}
  <DropZone onFilesDropped={handleFiles} />

  {/* 🎵 개별 파일 선택 */}
  <button onClick={() => fileInputRef.current?.click()}>
    🎵 파일 선택
  </button>

  {/* 📂 폴더 통째로 선택 */}
  <button onClick={() => folderInputRef.current?.click()}>
    📂 폴더 선택
  </button>
</div>

{/* ⚠️ input 2개 따로 만들어야 합니다! webkitdirectory 있으면 폴더만 됨 */}
<input
  ref={fileInputRef}
  type="file"
  multiple
  accept=".mp3,.wav,.m4a,.flac"
  style={{ display: 'none' }}
  onChange={(e) => handleFiles(Array.from(e.target.files))}
/>
<input
  ref={folderInputRef}
  type="file"
  webkitdirectory=""
  multiple
  style={{ display: 'none' }}
  onChange={(e) => handleFiles(Array.from(e.target.files))}
/>
```

> 💡 **AI가 자주 틀리는 것:** `webkitdirectory`를 파일 선택 input에 넣어버림
> → 폴더만 선택 가능해짐. **반드시 input을 2개로 분리하세요!**

---

### 패턴 2: 모달에서 텍스트 드래그하면 닫히는 버그

이거 진짜 미치는 버그입니다. 모달 안에서 텍스트 선택하려고 드래그하면 모달이 닫혀요.

```
❌ 흔한 실수 (onClick으로 닫기)
──────────────────────────────
<div className="backdrop" onClick={() => closeModal()}>
  <div className="modal" onClick={(e) => e.stopPropagation()}>
    <input value={text} />  ← 여기서 드래그하면 모달 닫힘!
  </div>
</div>

이유: 텍스트 드래그 → mouseup이 backdrop에서 발생 → click 이벤트 발생 → 모달 닫힘
```

```jsx
// ✅ 해결법: mousedown+mouseup 조합
let backdropMouseDown = false;

<div className="backdrop"
  onMouseDown={(e) => {
    // backdrop에서 시작된 클릭만 기록
    backdropMouseDown = (e.target === e.currentTarget);
  }}
  onMouseUp={(e) => {
    // mousedown도 backdrop, mouseup도 backdrop일 때만 닫기
    if (backdropMouseDown && e.target === e.currentTarget) {
      closeModal();
    }
    backdropMouseDown = false;
  }}
>
  <div className="modal"
    onMouseDown={(e) => e.stopPropagation()}
    onMouseUp={(e) => e.stopPropagation()}
  >
    <input value={text} />  {/* ← 이제 안전하게 드래그 가능! */}
  </div>
</div>
```

---

### 패턴 3: IndexedDB에 대용량 파일 저장

localStorage는 5MB 제한이라 오디오/이미지 저장 불가. IndexedDB를 씁니다.

```jsx
const FileDB = {
  DB_NAME: 'MyFilesDB',
  STORE_NAME: 'files',

  open() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.DB_NAME, 1);
      req.onupgradeneeded = () => {
        req.result.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },

  async saveFile(id, file) {
    const db = await this.open();
    const buffer = await file.arrayBuffer();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.STORE_NAME, 'readwrite');
      tx.objectStore(this.STORE_NAME).put({
        id, data: buffer, type: file.type, name: file.name
      });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  },

  async getFileURL(id) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.STORE_NAME, 'readonly');
      const req = tx.objectStore(this.STORE_NAME).get(id);
      req.onsuccess = () => {
        if (!req.result) return resolve(null);
        const blob = new Blob([req.result.data], { type: req.result.type });
        resolve(URL.createObjectURL(blob));
      };
      req.onerror = () => reject(req.error);
    });
  },
};
```

---

### 패턴 4: 백업 & 복원 (IndexedDB → JSON → IndexedDB)

```jsx
// 💾 백업: IndexedDB → base64 → JSON 다운로드
const handleBackup = async (items) => {
  const backup = { version: 1, exportedAt: new Date().toISOString(), items: [] };

  for (const item of items) {
    const entry = { ...item };
    delete entry.fileUrl;  // blob URL은 저장 불가

    // IndexedDB에서 파일 읽어서 base64로 변환
    const db = await FileDB.open();
    const record = await new Promise((resolve, reject) => {
      const tx = db.transaction(FileDB.STORE_NAME, 'readonly');
      const req = tx.objectStore(FileDB.STORE_NAME).get(item.id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

    if (record?.data) {
      const blob = new Blob([record.data], { type: record.type });
      const reader = new FileReader();
      entry.audioData = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    }
    backup.items.push(entry);
  }

  // 다운로드
  const blob = new Blob([JSON.stringify(backup)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `backup_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
};

// 📥 복원: JSON → base64 → IndexedDB
const handleRestore = async (file, existingItems) => {
  const text = await file.text();
  const backup = JSON.parse(text);

  for (const entry of backup.items) {
    if (existingItems.some(it => it.id === entry.id)) continue;  // 중복 스킵

    if (entry.audioData) {
      const resp = await fetch(entry.audioData);  // base64 → blob
      const blob = await resp.blob();
      await FileDB.saveFile(entry.id, blob);
      entry.fileUrl = URL.createObjectURL(blob);
      delete entry.audioData;
    }
    // → state에 추가
  }
};
```

---

### 패턴 5: 스마트 파일명 다운로드

```jsx
// 원본 파일명 대신 의미 있는 이름으로 다운로드
const handleDownload = (item) => {
  if (!item.fileUrl) return;

  const ext = (item.fileName || '').match(/\.[^.]+$/)?.[0] || '.mp3';
  // 파일명에 쓸 수 없는 문자 제거
  const safe = (str) => (str || 'Unknown').replace(/[<>:"/\\|?*]/g, '_');

  const a = document.createElement('a');
  a.href = item.fileUrl;
  a.download = `${safe(item.title)}_${safe(item.artist)}_${safe(item.label)}${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
```

---

## 🐛 AI가 자주 만드는 실수 TOP 5

| # | 실수 | 증상 | 해결 |
|---|------|------|------|
| 1 | `onDragOver`에 `preventDefault()` 누락 | 드롭이 아예 안 됨 | 4대 이벤트 모두 `preventDefault` |
| 2 | 파일/폴더 input을 하나로 합침 | 폴더만 선택되거나 파일만 선택됨 | input 2개로 분리 |
| 3 | 모달 닫기를 `onClick`으로 처리 | 텍스트 드래그하면 모달 닫힘 | `onMouseDown` + `onMouseUp` 조합 |
| 4 | 조건부 렌더링 안에 ref input 배치 | 다른 뷰에서 ref가 null | 항상 렌더링되는 곳에 input 배치 |
| 5 | `onDragLeave`에서 자식 이동 미처리 | 드롭존이 계속 깜빡거림 | `contains(relatedTarget)` 체크 |

---

## 📋 체크리스트

AI한테 드래그앤드롭 만들어달라고 한 후 이것만 확인하세요:

- [ ] `onDragOver`에 `e.preventDefault()` 있나?
- [ ] `onDrop`에 `e.preventDefault()` + `e.stopPropagation()` 있나?
- [ ] `onDragLeave`에 `contains(relatedTarget)` 체크 있나?
- [ ] 파일 선택 input과 폴더 선택 input이 분리되어 있나?
- [ ] input ref가 항상 렌더링되는 곳에 있나? (조건부 렌더링 밖)
- [ ] 모달이 있다면 `onClick` 대신 `onMouseDown`/`onMouseUp` 쓰나?

---

## 🎬 실제 사용 사례

이 코드는 **PEERMUSIC S급 음원 보관함**에서 실제로 사용 중입니다.

- 음악 데모 파일 드래그앤드롭 업로드
- IndexedDB에 오디오 파일 저장 (수십 MB)
- JSON 백업/복원으로 데이터 보호
- 파일명 자동 포맷팅 (피칭용)

---

## 🤝 기여하기

바이브코딩하다 발견한 드래그앤드롭 함정이 있나요?
PR 보내주세요! 다른 사람들이 같은 고통을 겪지 않도록 🙏

---

## 📜 라이센스

MIT License - 마음껏 복붙하세요. 그게 이 프로젝트의 존재 이유입니다.

---

<p align="center">
  <strong>Made with 😤 frustration and 🔥 determination</strong><br/>
  <em>"AI한테 10번 말하는 것보다 여기서 복붙 한 번이 낫다"</em>
</p>
