/**
 * App.jsx — 라우터 설정
 *
 * JSP 비교:
 *   JSP:   URL → Spring MVC @RequestMapping → JSP 파일
 *   React: URL → react-router-dom <Route> → Page 컴포넌트
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import BoardListPage from './pages/BoardListPage.jsx';
import BoardWritePage from './pages/BoardWritePage.jsx';
import BoardDetailPage from './pages/BoardDetailPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* / 접근 시 /board/list 로 리다이렉트 */}
          <Route index element={<Navigate to="/board/list" replace />} />

          {/* 게시판 목록 */}
          <Route path="board/list" element={<BoardListPage />} />

          {/* 게시글 등록 */}
          <Route path="board/write" element={<BoardWritePage />} />

          {/* 게시글 수정 — :id 는 URL 파라미터 (JSP의 ?id=123 과 유사) */}
          <Route path="board/edit/:id" element={<BoardWritePage />} />

          {/* 게시글 상세 */}
          <Route path="board/detail/:id" element={<BoardDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
