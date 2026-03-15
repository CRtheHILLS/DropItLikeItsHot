/**
 * 🔥 DropItLikeItsHot - Pattern 5: Backup & Restore
 *
 * IndexedDB 데이터를 JSON으로 백업하고 복원합니다.
 * 파일 데이터를 base64로 변환해서 JSON에 포함시킵니다.
 *
 * ⚠️ 파일이 많으면 JSON이 수백 MB가 될 수 있습니다.
 *    백업 전 토스트로 "잠시 기다려주세요" 알려주세요.
 */

// 💾 백업: IndexedDB → base64 → JSON 파일 다운로드
const handleBackup = async (items, FileDB) => {
  const backup = {
    version: 1,
    exportedAt: new Date().toISOString(),
    items: [],
  };

  for (const item of items) {
    const entry = { ...item };
    delete entry.fileUrl;  // blob URL은 세션마다 바뀌므로 저장 불가

    try {
      const db = await FileDB.open();
      const record = await new Promise((resolve, reject) => {
        const tx = db.transaction(FileDB.STORE_NAME, 'readonly');
        const req = tx.objectStore(FileDB.STORE_NAME).get(item.id);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });

      if (record?.data) {
        // ArrayBuffer → Blob → base64 data URL
        const blob = new Blob([record.data], { type: record.type || 'application/octet-stream' });
        const reader = new FileReader();
        entry.fileData = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      }
    } catch (e) {
      console.warn('Backup error for', item.id, e);
    }

    backup.items.push(entry);
  }

  // JSON → Blob → 다운로드
  const json = JSON.stringify(backup);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);

  return backup.items.length;
};


// 📥 복원: JSON 파일 → base64 → IndexedDB
const handleRestore = async (existingItems, setItems, FileDB) => {
  // 파일 선택 다이얼로그 열기
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';

  input.onchange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const backup = JSON.parse(text);

      if (!backup.items || !Array.isArray(backup.items)) {
        throw new Error('Invalid backup format');
      }

      let count = 0;
      for (const entry of backup.items) {
        // 중복 체크
        if (existingItems.some(it => it.id === entry.id)) continue;

        if (entry.fileData) {
          // base64 data URL → Blob → IndexedDB
          const resp = await fetch(entry.fileData);
          const blob = await resp.blob();
          await FileDB.saveFile(entry.id, blob);
          entry.fileUrl = URL.createObjectURL(blob);
          delete entry.fileData;
        }

        count++;
        setItems(prev => [...prev, entry]);
      }

      alert(`${count}건 복원 완료!`);
    } catch (err) {
      alert('복원 실패: ' + err.message);
    }
  };

  input.click();
};

// 사용 예시:
//
// 백업:
// const count = await handleBackup(myItems, FileDB);
// alert(`${count}건 백업 완료!`);
//
// 복원:
// handleRestore(myItems, setMyItems, FileDB);
