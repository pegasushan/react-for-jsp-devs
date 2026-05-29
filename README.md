# React 게시판 샘플 — JSP/jQuery 개발자를 위한 입문 가이드

> JSP + jQuery + Spring 경험이 있는 SI 개발자를 위한 React 실전 샘플입니다.  
> **백엔드 없이** 더미 데이터로 게시판 CRUD가 동작합니다.

---

## 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저 접속
# http://localhost:5173
```

## 구현 기능

| 기능 | 경로 | 설명 |
|------|------|------|
| 게시판 목록 | `/board/list` | 검색, 페이징, 삭제 |
| 게시글 등록 | `/board/write` | 유효성 검사, 저장 |
| 게시글 수정 | `/board/edit/:id` | 기존 데이터 로드 후 수정 |
| 게시글 상세 | `/board/detail/:id` | 조회수, 수정/삭제 |

## 프로젝트 구조

```
src/
├── api/
│   └── mockData.js        # 더미 데이터 & Mock API 함수
│                          # ← 실제 axios 연동 시 이 파일만 수정
├── components/
│   ├── Layout.jsx         # 공통 헤더/푸터 (layout.jsp)
│   ├── BoardTable.jsx     # 게시판 테이블 컴포넌트
│   ├── SearchBar.jsx      # 검색 + 글쓰기 버튼
│   └── Pagination.jsx     # 페이지네이션
├── hooks/
│   └── useBoardList.js    # 목록 데이터 관리 커스텀 훅
├── pages/
│   ├── BoardListPage.jsx  # 목록 페이지
│   ├── BoardWritePage.jsx # 등록/수정 페이지 (공용)
│   └── BoardDetailPage.jsx# 상세 페이지
├── App.jsx                # 라우터 설정
├── main.jsx               # 진입점
└── index.css              # 전체 스타일
```

## JSP/jQuery → React 핵심 대응표

| JSP/jQuery | React | 설명 |
|-----------|-------|------|
| `layout.jsp` (include) | `<Layout>` 컴포넌트 | 공통 레이아웃 |
| `<c:forEach>` | `.map()` | 리스트 반복 렌더링 |
| `<c:if>` / `<c:choose>` | 조건부 렌더링 `{조건 && <컴포넌트>}` | 조건부 표시 |
| `${변수}` | `{변수}` | 데이터 바인딩 |
| `$.ajax()` | `axios` + `async/await` | API 호출 |
| `$(document).ready()` | `useEffect(() => {}, [])` | 마운트 시 실행 |
| `$('#id').val()` | `useState` + `onChange` | 입력값 관리 |
| `location.href = '...'` | `navigate('/...')` | 페이지 이동 |
| `request.getParameter("id")` | `useParams()` | URL 파라미터 |

## 실제 Spring Boot API 연동 방법

`src/api/mockData.js`의 각 함수를 axios 호출로 교체하세요.

```javascript
// mockData.js → boardApi.js 로 교체 예시
import axios from 'axios';

export const getBoardList = (params) =>
  axios.get('/api/board', { params }).then(res => res.data);

export const getBoardDetail = (id) =>
  axios.get(`/api/board/${id}`).then(res => res.data);

export const createBoard = (data) =>
  axios.post('/api/board', data).then(res => res.data);

export const updateBoard = (id, data) =>
  axios.put(`/api/board/${id}`, data).then(res => res.data);

export const deleteBoard = (id) =>
  axios.delete(`/api/board/${id}`).then(res => res.data);
```

**CORS 설정 (Spring Boot):**

```java
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/board")
public class BoardController { ... }
```

**또는 vite.config.js에서 프록시 설정:**

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    }
  }
}
```

## 기술 스택

| 라이브러리 | 버전 | 역할 |
|-----------|------|------|
| React | 18 | UI 라이브러리 |
| Vite | 5 | 빌드 도구 |
| react-router-dom | 6 | 페이지 라우팅 |
| axios | 1.6 | HTTP 통신 |

## 다음 단계 학습

1. **TypeScript 적용** — 타입 안전성 확보
2. **TanStack Query** — 서버 상태 관리 (로딩/에러/캐싱 자동화)
3. **React Hook Form + Zod** — 폼 유효성 검사 고도화
4. **Zustand** — 전역 상태 관리 (로그인 정보 등)

---

> 관련 문서: [JSP/jQuery 개발자를 위한 React 실전 입문 가이드](https://www.notion.so/react-for-jsp-jquery-devs-36ffcb916e6f80d4abeecc7d93332c9c?source=copy_link)
