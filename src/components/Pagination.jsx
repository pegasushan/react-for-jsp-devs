/**
 * components/Pagination.jsx — 페이지네이션
 *
 * JSP 비교: 매 프로젝트마다 직접 구현하던 페이징 로직을
 *           재사용 가능한 컴포넌트로 분리
 *
 * Props:
 *   currentPage  - 현재 페이지 (1부터 시작)
 *   totalPages   - 전체 페이지 수
 *   onPageChange - 페이지 변경 콜백 (pageNum을 인자로 받음)
 *   blockSize    - 한 번에 보여줄 페이지 번호 수 (기본값 5)
 */
function Pagination({ currentPage, totalPages, onPageChange, blockSize = 5 }) {
  if (totalPages <= 1) return null;

  // 현재 페이지가 속한 블록의 시작/끝 페이지 계산
  const currentBlock = Math.ceil(currentPage / blockSize);
  const startPage = (currentBlock - 1) * blockSize + 1;
  const endPage = Math.min(startPage + blockSize - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <nav className="pagination">
      {/* 처음 페이지 */}
      <button
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
        title="처음"
      >
        «
      </button>

      {/* 이전 블록 */}
      <button
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        title="이전"
      >
        ‹
      </button>

      {/* 페이지 번호 */}
      {pages.map((p) => (
        <button
          key={p}
          className={`page-btn ${p === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      {/* 다음 블록 */}
      <button
        className="page-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        title="다음"
      >
        ›
      </button>

      {/* 마지막 페이지 */}
      <button
        className="page-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
        title="마지막"
      >
        »
      </button>
    </nav>
  );
}

export default Pagination;
