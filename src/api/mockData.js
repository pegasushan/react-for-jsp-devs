/**
 * api/mockData.js — 더미 데이터 & Mock API
 *
 * 실제 Spring Boot 백엔드 없이 프론트엔드 개발/테스트 가능
 * 실제 API 연동 시 각 함수의 내용을 axios 호출로 교체
 *
 * ─────────────────────────────────────────────
 * 실제 연동 예시 (boardApi.js 별도 파일 분리 권장):
 *
 * import axios from 'axios';
 * const API_BASE = '/api/board';
 *
 * export const getBoardList = (params) =>
 *   axios.get(API_BASE, { params }).then(res => res.data);
 *
 * export const getBoardDetail = (id) =>
 *   axios.get(`${API_BASE}/${id}`).then(res => res.data);
 *
 * export const createBoard = (data) =>
 *   axios.post(API_BASE, data).then(res => res.data);
 *
 * export const updateBoard = (id, data) =>
 *   axios.put(`${API_BASE}/${id}`, data).then(res => res.data);
 *
 * export const deleteBoard = (id) =>
 *   axios.delete(`${API_BASE}/${id}`).then(res => res.data);
 * ─────────────────────────────────────────────
 */

// 인메모리 더미 DB (새로고침하면 초기화됨)
let nextId = 11;
let DUMMY_DB = [
  { id: 10, categoryCode: '01', title: 'React 프로젝트 폴더 구조 잡는 법', content: 'src 하위를 pages, components, hooks, api로 구분하는 것이 일반적입니다.\n\n각 역할:\n- pages: 라우팅 단위 페이지\n- components: 재사용 컴포넌트\n- hooks: 커스텀 훅\n- api: 서버 통신 함수', regNm: '박지성', regDt: '2024-01-10', views: 230 },
  { id: 9,  categoryCode: '02', title: 'useState vs useReducer 언제 쓸까?', content: '간단한 state는 useState, 여러 state가 연관되어 복잡한 로직이 필요할 때는 useReducer가 적합합니다.', regNm: '김민준', regDt: '2024-01-09', views: 187 },
  { id: 8,  categoryCode: '03', title: 'JSP에서 이미지 업로드하던 방식 React에서는?', content: 'input type="file"의 onChange에서 e.target.files로 파일을 가져온 후 FormData에 담아 axios.post로 전송합니다.', regNm: '이수빈', regDt: '2024-01-08', views: 312 },
  { id: 7,  categoryCode: '01', title: 'Vite vs CRA (Create React App) 차이', content: 'CRA는 Webpack 기반으로 느리고, Vite는 ESM 기반으로 빠릅니다. 2024년 기준 신규 프로젝트는 Vite 사용을 권장합니다.', regNm: '최하은', regDt: '2024-01-07', views: 156 },
  { id: 6,  categoryCode: '02', title: 'React에서 세션/로그인 정보 관리하기', content: 'JWT 토큰을 localStorage에 저장하고, axios interceptor로 모든 요청에 자동으로 헤더를 추가하는 방식이 일반적입니다.', regNm: '정도윤', regDt: '2024-01-06', views: 428 },
  { id: 5,  categoryCode: '03', title: '공통 알림/토스트 메시지 구현 방법', content: 'alert() 대신 react-toastify 라이브러리를 사용하거나, Context API로 전역 알림 컴포넌트를 만드는 방법이 있습니다.', regNm: '홍길동', regDt: '2024-01-05', views: 95 },
  { id: 4,  categoryCode: '01', title: 'SI 현장에서 실제로 사용하는 React 스택', content: 'Vite + React + TypeScript + TanStack Query + Zustand + React Hook Form + Zod 조합이 현재 많이 사용됩니다.', regNm: '김철수', regDt: '2024-01-04', views: 541 },
  { id: 3,  categoryCode: '02', title: 'React 개발환경 세팅 방법 (초보자용)', content: 'Node.js 설치 후 npm create vite@latest 명령어 한 줄로 시작할 수 있습니다. VS Code 확장 설치도 잊지 마세요.', regNm: '이영희', regDt: '2024-01-03', views: 120 },
  { id: 2,  categoryCode: '03', title: 'JSP에서 React로 전환 후기 (6개월 경험)', content: '처음에는 state 개념이 낯설었지만, 익숙해지고 나니 jQuery로 DOM 직접 조작하던 것보다 훨씬 유지보수가 편합니다.', regNm: '박민수', regDt: '2024-01-02', views: 85 },
  { id: 1,  categoryCode: '01', title: '안녕하세요! 게시판 샘플 프로젝트입니다', content: 'JSP/jQuery 개발자를 위한 React 실전 입문 샘플입니다.\n\n게시글 목록, 등록, 수정, 삭제 기능이 모두 구현되어 있습니다.\n실제 API 연동 없이 더미 데이터로 동작합니다.', regNm: '관리자', regDt: '2024-01-01', views: 42 },
];

const CATEGORY_MAP = { '01': '공지사항', '02': '자유게시판', '03': 'Q&A' };
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

/** 목록 조회 */
export async function getBoardList({ page = 1, size = 5, keyword = '' } = {}) {
  await delay();
  const filtered = keyword
    ? DUMMY_DB.filter(
        (item) =>
          item.title.includes(keyword) || item.regNm.includes(keyword)
      )
    : [...DUMMY_DB];

  const totalCount = filtered.length;
  const start = (page - 1) * size;
  const items = filtered.slice(start, start + size).map((item) => ({
    ...item,
    categoryName: CATEGORY_MAP[item.categoryCode] ?? '-',
  }));

  return { items, totalCount, page, size };
}

/** 단건 조회 */
export async function getBoardDetail(id) {
  await delay();
  const item = DUMMY_DB.find((d) => d.id === Number(id));
  if (!item) throw new Error('게시글을 찾을 수 없습니다');
  // 조회수 증가 (mock)
  item.views += 1;
  return { ...item, categoryName: CATEGORY_MAP[item.categoryCode] ?? '-' };
}

/** 등록 */
export async function createBoard(data) {
  await delay(500);
  const newItem = {
    id: nextId++,
    ...data,
    regNm: '홍길동', // 실제로는 로그인 사용자 정보
    regDt: new Date().toISOString().slice(0, 10),
    views: 0,
  };
  DUMMY_DB = [newItem, ...DUMMY_DB];
  return newItem;
}

/** 수정 */
export async function updateBoard(id, data) {
  await delay(500);
  const index = DUMMY_DB.findIndex((d) => d.id === Number(id));
  if (index === -1) throw new Error('게시글을 찾을 수 없습니다');
  DUMMY_DB[index] = { ...DUMMY_DB[index], ...data };
  return DUMMY_DB[index];
}

/** 삭제 */
export async function deleteBoard(id) {
  await delay(300);
  const index = DUMMY_DB.findIndex((d) => d.id === Number(id));
  if (index === -1) throw new Error('게시글을 찾을 수 없습니다');
  DUMMY_DB.splice(index, 1);
  return { success: true };
}
