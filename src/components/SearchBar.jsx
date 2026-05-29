/**
 * components/SearchBar.jsx — 검색 바
 *
 * 재사용 가능한 검색 컴포넌트
 * props로 동작(onSearch)과 버튼 텍스트 등을 커스터마이징
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ onSearch, writeLink = '/board/write' }) {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    onSearch(inputValue.trim());
  };

  const handleKeyUp = (e) => {
    // Enter 키 입력 시 검색 실행
    if (e.key === 'Enter') handleSearch();
  };

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrap">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleKeyUp}
          placeholder="제목 또는 작성자 검색"
          className="search-input"
        />
        {inputValue && (
          <button className="btn-clear" onClick={handleClear} title="검색어 초기화">
            ✕
          </button>
        )}
      </div>
      <button className="btn btn-secondary" onClick={handleSearch}>
        🔍 검색
      </button>
      <button className="btn btn-primary" onClick={() => navigate(writeLink)}>
        ✏️ 글쓰기
      </button>
    </div>
  );
}

export default SearchBar;
