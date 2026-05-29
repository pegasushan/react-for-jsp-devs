/**
 * hooks/useBoardList.js — 커스텀 훅
 *
 * 컴포넌트에서 API 호출 로직을 분리하는 패턴
 * → 컴포넌트는 UI에만 집중, 데이터 로직은 훅에서 관리
 *
 * JSP 비교: Service 레이어를 별도로 분리하는 것과 유사한 개념
 */
import { useState, useEffect, useCallback } from 'react';
import { getBoardList } from '../api/mockData.js';

export function useBoardList() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const PAGE_SIZE = 5;

  // useCallback: 함수를 메모이제이션해서 불필요한 재생성 방지
  const loadList = useCallback(async (pageNum, kw) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getBoardList({ page: pageNum, size: PAGE_SIZE, keyword: kw });
      setItems(result.items);
      setTotalCount(result.totalCount);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // page 또는 keyword 변경 시 목록 재조회
  useEffect(() => {
    loadList(page, keyword);
  }, [page, keyword, loadList]);

  const handleSearch = (kw) => {
    setKeyword(kw);
    setPage(1); // 검색 시 첫 페이지로 초기화
  };

  const handleDelete = async (id, deleteFn) => {
    try {
      await deleteFn(id);
      // 삭제 후 현재 페이지 아이템이 0개면 이전 페이지로
      const remaining = totalCount - 1;
      const maxPage = Math.ceil(remaining / PAGE_SIZE) || 1;
      const nextPage = Math.min(page, maxPage);
      if (nextPage !== page) {
        setPage(nextPage);
      } else {
        loadList(page, keyword);
      }
    } catch (err) {
      throw err;
    }
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return {
    items,
    isLoading,
    error,
    page,
    totalPages,
    totalCount,
    setPage,
    handleSearch,
    handleDelete,
    reload: () => loadList(page, keyword),
  };
}
