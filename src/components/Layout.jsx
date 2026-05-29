/**
 * components/Layout.jsx — 공통 레이아웃
 *
 * JSP 비교: layout.jsp (header.jsp + content + footer.jsp include 구조)
 *
 * react-router-dom의 <Outlet />이 자식 라우트 컴포넌트를 렌더링하는 위치
 * = JSP의 <jsp:include page="content.jsp" /> 역할
 */
import { Outlet, Link, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();

  return (
    <div className="app-container">
      {/* ===== HEADER (header.jsp) ===== */}
      <header className="app-header">
        <div className="header-inner">
          <h1 className="logo">
            <Link to="/">📋 React 게시판</Link>
          </h1>
          <nav className="gnb">
            <Link
              to="/board/list"
              className={location.pathname.startsWith('/board') ? 'active' : ''}
            >
              게시판
            </Link>
          </nav>
          <div className="header-right">
            <span className="user-info">👤 홍길동 (개발팀)</span>
          </div>
        </div>
      </header>

      {/* ===== CONTENT (각 페이지 컴포넌트) ===== */}
      <main className="app-main">
        <Outlet />
      </main>

      {/* ===== FOOTER (footer.jsp) ===== */}
      <footer className="app-footer">
        <p>React 게시판 샘플 — JSP/jQuery 개발자를 위한 React 입문 가이드</p>
      </footer>
    </div>
  );
}

export default Layout;
