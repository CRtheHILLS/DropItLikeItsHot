/**
 * 🔥 DropItLikeItsHot - Pattern 1: Basic File Drop
 *
 * 가장 기본적인 파일 드래그앤드롭.
 * 이 4개 이벤트가 드래그앤드롭의 전부입니다.
 *
 * 사용법: 그냥 복붙하세요.
 */

const FileDropZone = ({ onFiles, accept = '*' }) => {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const filterFiles = (files) => {
    if (accept === '*') return files;
    const exts = accept.split(',').map(e => e.trim().toLowerCase());
    return files.filter(f => exts.some(ext => f.name.toLowerCase().endsWith(ext)));
  };

  return (
    <div
      style={{
        border: `2px dashed ${isDragOver ? '#f59e0b' : '#4b5563'}`,
        borderRadius: '16px',
        padding: '40px 20px',
        textAlign: 'center',
        background: isDragOver ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.02)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
      // ═══════════════════════════════════════════════
      // 🔥 핵심 4대 이벤트 — 하나라도 빠지면 안 됩니다
      // ═══════════════════════════════════════════════
      onDragOver={(e) => {
        e.preventDefault();       // ← 없으면 드롭 자체가 차단됨
        e.stopPropagation();      // ← 없으면 부모 요소가 이벤트 가로챔
        setIsDragOver(true);
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
      }}
      onDragLeave={(e) => {
        e.stopPropagation();
        // ← contains 체크 없으면 자식 요소 드나들 때마다 깜빡거림
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsDragOver(false);
        }
      }}
      onDrop={(e) => {
        e.preventDefault();       // ← 없으면 브라우저가 파일을 열어버림
        e.stopPropagation();
        setIsDragOver(false);
        const files = filterFiles(Array.from(e.dataTransfer.files));
        if (files.length > 0) onFiles(files);
      }}
    >
      <p style={{ fontSize: '32px', marginBottom: '8px' }}>
        {isDragOver ? '🔥' : '📁'}
      </p>
      <p style={{ color: isDragOver ? '#f59e0b' : '#9ca3af' }}>
        {isDragOver ? '놓으세요!' : '파일을 여기에 드래그하세요'}
      </p>
      <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>
        {accept === '*' ? '모든 파일 지원' : accept}
      </p>
    </div>
  );
};

// 사용 예시:
// <FileDropZone
//   accept=".mp3,.wav,.flac,.m4a"
//   onFiles={(files) => console.log('Dropped:', files)}
// />
