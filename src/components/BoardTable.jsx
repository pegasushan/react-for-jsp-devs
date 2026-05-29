/**
 * components/BoardTable.jsx — 게시판 목록 테이블
 *
 * JSP 비교: <c:forEach> 로 <tr> 을 반복 출력하던 것을
 *           .map() 으로 처리 + 삭제 버튼 이벤트까지 컴포넌트 내부에서 처리
 *
 * Props:
 *   items    - 게시글 목록 배열
 *   onDelete - 삭제 콜백 함수 (id를 인자로 받음)
 */
import { useNavigate } from 'react-router-dom';

const CATEGORY_BADGE = {
  '01': { label: '공지', className: 'badge-notice' },
  '02': { label: '자유', className: 'badge-free' },
  '03': { label: 'Q&A', className: 'badge-qna' },
};

function BoardTable({ items, onDelete }) {
  const navigate = useNavigate();

  // 빈 목록 처리 (JSP의 <c:when test="${empty list}"> 역할)
  if (items.length === 0) {
    return (
      <table className="board-table">
        <colgroup>
          <col style={{ width: '6%' }} />
          <col style={{ width: '10%' }} />
          <col />
          <col style={{ width: '10%' }} />
          <col style={{ width: '8%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '12%' }} />
        </colgroup>
        <TableHead />
        <tbody>
          <tr>
            <td colSpan={7} className="empty-row">
              등록된 게시물이 없습니다
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table className="board-table">
      <colgroup>
        <col style={{ width: '6%' }} />
        <col style={{ width: '10%' }} />
        <col />
        <col style={{ width: '10%' }} />
        <col style={{ width: '8%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '12%' }} />
      </colgroup>
      <TableHead />
      <tbody>
        {/* JSP의 <c:forEach> 역할 — key는 반드시 고유한 값(id) 사용 */}
        {items.map((item) => {
          const badge = CATEGORY_BADGE[item.categoryCode];
          return (
            <tr key={item.id} className="board-row">
              <td className="td-id">{item.id}</td>
              <td className="td-category">
                {badge && (
                  <span className={`badge ${badge.className}`}>
                    {badge.label}
                  </span>
                )}
              </td>
              <td className="td-title">
                {/* Link 대신 onClick으로 navigate — 프로그래밍 방식 이동 */}
                <span
                  className="title-link"
                  onClick={() => navigate(`/board/detail/${item.id}`)}
                >
                  {item.title}
                </span>
              </td>
              <td className="td-author">{item.regNm}</td>
              <td className="td-views">{item.views.toLocaleString()}</td>
              <td className="td-date">{item.regDt}</td>
              <td className="td-actions">
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => navigate(`/board/edit/${item.id}`)}
                >
                  수정
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(item.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function TableHead() {
  return (
    <thead>
      <tr>
        <th>번호</th>
        <th>분류</th>
        <th>제목</th>
        <th>작성자</th>
        <th>조회</th>
        <th>등록일</th>
        <th>관리</th>
      </tr>
    </thead>
  );
}

export default BoardTable;
