/**
 * pages/BoardListPage.jsx — 게시판 목록 페이지
 *
 * JSP 비교: boardList.jsp + BoardController.java(list 메서드) 합친 것
 *
 * 이 파일에서 담당:
 *   - UI 레이아웃 (테이블, 검색, 페이징)
 *   - 사용자 액션 처리 (검색, 삭제)
 *
 * 데이터 로직은 useBoardList 커스텀 훅에서 담당
 */
import { useBoardList } from '../hooks/useBoardList.js';
import { deleteBoard } from '../api/mockData.js';
import SearchBar from '../components/SearchBar.jsx';
import BoardTable from '../components/BoardTable.jsx';
import Pagination from '../components/Pagination.jsx';

function BoardListPage() {
  const {
    items,
    isLoading,
    error,
    page,
    totalPages,
    totalCount,
    setPage,
    handleSearch,
    handleDelete,
  } = useBoardList();

  // 삭제 처리
  const onDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await handleDelete(id, deleteBoard);
      alert('삭제되었습니다');
    } catch {
      alert('삭제에 실패했습니다');
    }
  };

  return (
    <div className="page-container">
      {/* 페이지 제목 */}
      <div className="page-header">
        <h2 className="page-title">게시판</h2>
        <span className="total-count">총 {totalCount}건</span>
      </div>

      {/* 검색 바 */}
      <SearchBar onSearch={handleSearch} />

      {/* 목록 테이블 */}
      {error ? (
        <div className="error-box">오류: {error}</div>
      ) : isLoading ? (
        <div className="loading-box">
          <span className="spinner" />
          목록을 불러오는 중...
        </div>
      ) : (
        <BoardTable items={items} onDelete={onDelete} />
      )}

      {/* 페이지네이션 */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

export default BoardListPage;
