/**
 * 🔥 DropItLikeItsHot - Pattern 7: Folder Select
 *
 * 폴더 통째로 선택해서 그 안의 파일을 일괄 추가합니다.
 * webkitdirectory 속성을 사용합니다.
 *
 * ⚠️ 주의: webkitdirectory가 있는 input은 폴더만 선택 가능합니다.
 *    개별 파일도 선택하려면 input을 2개로 분리해야 합니다!
 *    → combo-upload.jsx 참고
 */

const FolderSelect = ({ onFiles, accept = '.mp3,.wav,.flac,.m4a,.aiff' }) => {
  const folderInputRef = React.useRef(null);

  const handleChange = (e) => {
    const allFiles = Array.from(e.target.files || []);

    // 폴더 안의 모든 파일 중 원하는 확장자만 필터링
    const exts = accept.split(',').map(ext => ext.trim().toLowerCase());
    const filtered = allFiles.filter(f =>
      exts.some(ext => f.name.toLowerCase().endsWith(ext))
    );

    if (filtered.length > 0) {
      onFiles(filtered);
    } else {
      alert('지원하는 파일이 없습니다.');
    }

    // ⚠️ 같은 폴더 재선택 가능하게 value 리셋
    e.target.value = '';
  };

  return (
    <div>
      <button
        onClick={() => folderInputRef.current?.click()}
        style={{
          padding: '12px 24px',
          borderRadius: '12px',
          background: 'transparent',
          color: '#e5e7eb',
          border: '1px solid #4b5563',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        📂 폴더 선택
      </button>

      {/* ═══════════════════════════════════════════════ */}
      {/* webkitdirectory: 폴더 선택 다이얼로그가 열림   */}
      {/* 이게 있으면 개별 파일 선택이 불가능합니다!      */}
      {/* ═══════════════════════════════════════════════ */}
      <input
        ref={folderInputRef}
        type="file"
        webkitdirectory=""
        multiple
        accept={accept}
        style={{ display: 'none' }}
        onChange={handleChange}
      />
    </div>
  );
};

// 사용 예시:
// <FolderSelect
//   accept=".mp3,.wav,.flac"
//   onFiles={(files) => {
//     console.log(`${files.length}개 파일 선택됨`);
//     files.forEach(f => console.log(f.name, f.size));
//   }}
// />
