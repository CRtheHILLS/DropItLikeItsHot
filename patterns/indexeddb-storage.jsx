/**
 * 🔥 DropItLikeItsHot - Pattern 4: IndexedDB File Storage
 *
 * localStorage는 5MB 제한이라 파일 저장 불가.
 * IndexedDB를 쓰면 수백 MB도 저장 가능합니다.
 *
 * 이 패턴은 오디오, 이미지, 비디오 등 대용량 파일을
 * 브라우저에 영구 저장할 때 사용합니다.
 */

const FileDB = {
  DB_NAME: 'MyAppFiles',
  STORE_NAME: 'files',
  DB_VERSION: 1,

  // DB 열기 (없으면 자동 생성)
  open() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.DB_NAME, this.DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME, { keyPath: 'id' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  },

  // 파일 저장
  async saveFile(id, file) {
    const db = await this.open();
    const buffer = await file.arrayBuffer();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.STORE_NAME, 'readwrite');
      tx.objectStore(this.STORE_NAME).put({
        id,
        data: buffer,
        type: file.type || 'application/octet-stream',
        name: file.name,
        size: file.size,
        savedAt: new Date().toISOString(),
      });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  },

  // 파일을 blob URL로 가져오기 (오디오 재생, 이미지 표시 등)
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

  // 파일 삭제
  async deleteFile(id) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.STORE_NAME, 'readwrite');
      tx.objectStore(this.STORE_NAME).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  },

  // 전체 파일 목록 (메타데이터만)
  async listFiles() {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.STORE_NAME, 'readonly');
      const req = tx.objectStore(this.STORE_NAME).getAll();
      req.onsuccess = () => {
        resolve(req.result.map(r => ({
          id: r.id, name: r.name, type: r.type,
          size: r.size, savedAt: r.savedAt,
        })));
      };
      req.onerror = () => reject(req.error);
    });
  },
};

// 사용 예시:
//
// 저장:
// await FileDB.saveFile('song-001', audioFile);
//
// 재생:
// const url = await FileDB.getFileURL('song-001');
// audioElement.src = url;
//
// 삭제:
// await FileDB.deleteFile('song-001');
