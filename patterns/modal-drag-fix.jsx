/**
 * 🔥 DropItLikeItsHot - Pattern 3: Modal Drag Fix
 *
 * 모달 안에서 텍스트를 드래그하면 모달이 닫히는 버그 수정.
 * 이거 때문에 3시간 날린 사람 많습니다.
 *
 * 원인: onClick으로 backdrop 닫기 처리 시,
 *       텍스트 드래그 → mouseup이 backdrop에서 발생 → click 이벤트 → 모달 닫힘
 *
 * 해결: mousedown과 mouseup이 모두 backdrop에서 발생했을 때만 닫기
 */

const SafeModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  let backdropMouseDown = false;

  return (
    <div
      // backdrop
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(4px)',
      }}
      // ═══════════════════════════════════════════════
      // ✅ onClick 대신 onMouseDown + onMouseUp 조합
      // ═══════════════════════════════════════════════
      onMouseDown={(e) => {
        // backdrop 자체에서 시작된 클릭만 기록
        backdropMouseDown = (e.target === e.currentTarget);
      }}
      onMouseUp={(e) => {
        // mousedown도 backdrop, mouseup도 backdrop → 진짜 backdrop 클릭
        if (backdropMouseDown && e.target === e.currentTarget) {
          onClose();
        }
        backdropMouseDown = false;
      }}
      // click 이벤트 차단 (혹시 모를 버블링 방지)
      onClick={(e) => e.stopPropagation()}
    >
      <div
        // modal content
        style={{
          background: '#1e1e2e',
          borderRadius: '24px',
          padding: '32px',
          maxWidth: '500px',
          width: '100%',
          margin: '16px',
        }}
        // ═══════════════════════════════════════════════
        // ✅ 모달 내부에서 발생하는 mouse 이벤트 차단
        // ═══════════════════════════════════════════════
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// 사용 예시:
// <SafeModal isOpen={showEdit} onClose={() => setShowEdit(false)}>
//   <input value={name} onChange={...} />   ← 텍스트 드래그해도 모달 안 닫힘!
//   <textarea value={note} onChange={...} />
// </SafeModal>
