/**
 * pages/BoardDetailPage.jsx — 게시글 상세 페이지
 *
 * JSP 비교: boardDetail.jsp
 *
 * 학습 포인트:
 *   - useParams(): URL 파라미터 읽기 (/board/detail/:id)
 *   - useEffect(): 컴포넌트 마운트 시 API 호출 ($(document).ready 대응)
 *   - 조건부 렌더링: 로딩 / 에러 / 데이터 상태별 화면 분기
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBoardDetail, deleteBoard } from '../api/mockData.js';

const CATEGORY_LABEL = { '01': '공지사항', '02': '자유게시판', '03': 'Q&A' };

function BoardDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 컴포넌트 마운트 시 데이터 조회
  // JSP 비교: $(document).ready 또는 페이지 로드 시 $.ajax() 호출
  useEffect(() => {
    setIsLoading(true);
    getBoardDetail(id)
      .then((data) => setItem(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]); // id가 바뀌면 재조회

  const handleDelete = async () => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    try {
      await deleteBoard(id);
      alert('삭제되었습니다');
      navigate('/board/list');
    } catch {
      alert('삭제에 실패했습니다');
    }
  };

  // ─── 조건부 렌더링 ───────────────────────────────────────
  // JSP: <c:choose> / <c:when> 역할을 if문으로 처리
  if (isLoading) {
    return (
      <div className="page-container">
        <div className="loading-box">
          <span className="spinner" /> 게시글을 불러오는 중...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-box">
          <p>오류가 발생했습니다: {error}</p>
          <button className="btn btn-secondary" onClick={() => navigate('/board/list')}>
            목록으로
          </button>
        </div>
      </div>
    );
  }

  if (!item) return null;
  // ─────────────────────────────────────────────────────────

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">게시글 상세</h2>
      </div>

      {/* 상세 카드 */}
      <div className="detail-card">
        {/* 메타 정보 */}
        <div className="detail-meta">
          <span className="detail-category">
            {CATEGORY_LABEL[item.categoryCode] ?? '-'}
          </span>
          <h3 className="detail-title">{item.title}</h3>
          <div className="detail-info">
            <span>작성자: {item.regNm}</span>
            <span>등록일: {item.regDt}</span>
            <span>조회수: {item.views.toLocaleString()}</span>
          </div>
        </div>

        {/* 본문 */}
        {/* JSP의 ${fn:replace(content, '\n', '<br>')} 역할 */}
        <div className="detail-content">
          {item.content.split('\n').map((line, index) => (
            <p key={index}>{line || <br />}</p>
          ))}
        </div>

        {/* 버튼 영역 */}
        <div className="btn-area">
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/board/list')}
          >
            목록
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate(`/board/edit/${item.id}`)}
          >
            수정
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardDetailPage;
