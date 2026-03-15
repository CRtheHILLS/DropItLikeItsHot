/**
 * 🔥 DropItLikeItsHot - Pattern 2: Combo Upload (3종 세트)
 *
 * 드래그앤드롭 + 파일선택 + 폴더선택
 * AI가 가장 많이 틀리는 패턴입니다.
 *
 * ⚠️ 핵심: input을 반드시 2개로 분리하세요!
 *    webkitdirectory가 있으면 폴더만 선택됩니다.
 */

const ComboUpload = ({ onFiles, accept = '.mp3,.wav,.flac,.m4a' }) => {
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef(null);    // 개별 파일용
  const folderInputRef = React.useRef(null);  // 폴더용

  const filterAudio = (files) => {
    const exts = accept.split(',').map(e => e.trim().toLowerCase());
    return Array.from(files).filter(f =>
      exts.some(ext => f.name.toLowerCase().endsWith(ext))
    );
  };

  const handleFiles = (fileList) => {
    const filtered = filterAudio(fileList);
    if (filtered.length > 0) onFiles(filtered);
  };

  return (
    <div>
      {/* 3종 세트 레이아웃 */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'stretch' }}>

        {/* 1️⃣ 드롭존 */}
        <div
          style={{
            flex: 1,
            border: `2px dashed ${isDragOver ? '#f59e0b' : '#4b5563'}`,
            borderRadius: '16px',
            padding: '24px',
            textAlign: 'center',
            background: isDragOver ? 'rgba(245,158,11,0.1)' : 'transparent',
            transition: 'all 0.2s',
          }}
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(true); }}
          onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(true); }}
          onDragLeave={(e) => { e.stopPropagation(); if (!e.currentTarget.contains(e.relatedTarget)) setIsDragOver(false); }}
          onDrop={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(false); handleFiles(e.dataTransfer.files); }}
        >
          <p style={{ color: '#9ca3af', pointerEvents: 'none' }}>
            {isDragOver ? '🔥 놓으세요!' : '파일을 드래그하세요'}
          </p>
        </div>

        {/* 2️⃣ 파일 선택 버튼 */}
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            padding: '12px 24px',
            borderRadius: '16px',
            background: '#f59e0b',
            color: '#000',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          🎵 파일 선택
        </button>

        {/* 3️⃣ 폴더 선택 버튼 */}
        <button
          onClick={() => folderInputRef.current?.click()}
          style={{
            padding: '12px 24px',
            borderRadius: '16px',
            background: 'transparent',
            color: '#fff',
            border: '1px solid #4b5563',
            fontWeight: 'bold',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          📂 폴더 선택
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ⚠️ input 2개 분리 — AI가 가장 많이 틀리는 부분!      */}
      {/* webkitdirectory 있으면 폴더만 선택됨                   */}
      {/* ═══════════════════════════════════════════════════════ */}

      {/* 파일 선택용 (webkitdirectory 없음) */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        style={{ display: 'none' }}
        onChange={(e) => { handleFiles(e.target.files); e.target.value = ''; }}
      />

      {/* 폴더 선택용 (webkitdirectory 있음) */}
      <input
        ref={folderInputRef}
        type="file"
        webkitdirectory=""
        multiple
        accept={accept}
        style={{ display: 'none' }}
        onChange={(e) => { handleFiles(e.target.files); e.target.value = ''; }}
      />
    </div>
  );
};
