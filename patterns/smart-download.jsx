/**
 * 🔥 DropItLikeItsHot - Pattern 6: Smart Download
 *
 * blob URL 파일을 의미 있는 파일명으로 다운로드합니다.
 * 원본 파일명 대신 커스텀 포맷으로 변환합니다.
 *
 * 예: "audio_2024_001.mp3" → "Teeny-Tiny Heart_UFC_Pitched by MC.mp3"
 */

const smartDownload = (fileUrl, { title, artist, label, originalFileName }) => {
  if (!fileUrl) return;

  // 원본 확장자 추출
  const ext = (originalFileName || '').match(/\.[^.]+$/)?.[0] || '.mp3';

  // 파일명에 쓸 수 없는 문자 제거
  const safe = (str) => (str || 'Unknown').replace(/[<>:"/\\|?*]/g, '_').trim();

  // 다운로드
  const a = document.createElement('a');
  a.href = fileUrl;
  a.download = `${safe(title)}_${safe(artist)}_${safe(label)}${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// 사용 예시:
//
// smartDownload(item.fileUrl, {
//   title: 'Teeny-Tiny Heart',
//   artist: 'UFC',
//   label: 'Pitched by MC',
//   originalFileName: 'track001.mp3',
// });
//
// → 다운로드: "Teeny-Tiny Heart_UFC_Pitched by MC.mp3"


// ═══════════════════════════════════════════
// 커스텀 포맷 예시들
// ═══════════════════════════════════════════

// 날짜 포함:
// a.download = `${safe(title)}_${new Date().toISOString().slice(0,10)}${ext}`;
// → "My Song_2024-03-15.mp3"

// 번호 포함:
// a.download = `${String(index+1).padStart(2,'0')}_${safe(title)}${ext}`;
// → "01_My Song.mp3"

// 폴더 구조 힌트:
// a.download = `${safe(genre)}__${safe(title)}_${safe(artist)}${ext}`;
// → "Pop__My Song_John.mp3"
