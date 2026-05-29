/**
 * pages/BoardWritePage.jsx — 게시글 등록 / 수정 페이지
 *
 * JSP 비교: boardWrite.jsp (등록/수정 공용)
 *
 * react-router-dom의 useParams()로 URL의 :id 파라미터를 읽음
 *   /board/write      → 등록 모드 (id 없음)
 *   /board/edit/5     → 수정 모드 (id = 5)
 *
 * JSP 비교: request.getParameter("id") 또는 @PathVariable
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBoardDetail, createBoard, updateBoard } from '../api/mockData.js';

const CATEGORIES = [
  { value: '01', label: '공지사항' },
  { value: '02', label: '자유게시판' },
  { value: '03', label: 'Q&A' },
];

const INITIAL_FORM = {
  categoryCode: '02',
  title: '',
  content: '',
};

function BoardWritePage() {
  const { id } = useParams();             // URL 파라미터 읽기
  const navigate = useNavigate();         // 프로그래밍 방식 페이지 이동
  const isEditMode = !!id;               // id 있으면 수정, 없으면 등록

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 수정 모드: 기존 데이터 로드
  useEffect(() => {
    if (!isEditMode) return;

    setIsLoading(true);
    getBoardDetail(id)
      .then((data) => {
        setForm({
          categoryCode: data.categoryCode,
          title: data.title,
          content: data.content,
        });
      })
      .catch(() => {
        alert('게시글을 불러오지 못했습니다');
        navigate('/board/list');
      })
      .finally(() => setIsLoading(false));
  }, [id, isEditMode, navigate]);

  // 입력 변경 공통 핸들러
  // JSP 비교: 각 input마다 onchange="document.getElementById('...').value = this.value"
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // 입력 시 해당 필드 에러 메시지 제거
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // 유효성 검사
  const validate = () => {
    const errs = {};
    if (!form.title.trim()) {
      errs.title = '제목을 입력하세요';
    } else if (form.title.length > 100) {
      errs.title = '제목은 100자 이내로 입력하세요';
    }
    if (!form.content.trim()) {
      errs.content = '내용을 입력하세요';
    }
    return errs;
  };

  // 저장 처리
  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // 첫 번째 에러 필드로 포커스 이동 (UX 개선)
      const firstErrorField = Object.keys(validationErrors)[0];
      document.querySelector(`[name="${firstErrorField}"]`)?.focus();
      return;
    }

    setIsSaving(true);
    try {
      if (isEditMode) {
        await updateBoard(id, form);
        alert('수정되었습니다');
        navigate(`/board/detail/${id}`);
      } else {
        const newItem = await createBoard(form);
        alert('등록되었습니다');
        navigate(`/board/detail/${newItem.id}`);
      }
    } catch (err) {
      alert(`${isEditMode ? '수정' : '등록'}에 실패했습니다: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // 취소 — 브라우저 히스토리 뒤로 (JSP의 history.back() 동일)
  const handleCancel = () => {
    if (window.confirm('작성 중인 내용이 사라집니다. 취소하시겠습니까?')) {
      navigate(-1);
    }
  };

  if (isLoading) {
    return <div className="loading-box">데이터를 불러오는 중...</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">
          {isEditMode ? '게시글 수정' : '게시글 등록'}
        </h2>
      </div>

      <div className="form-container">
        {/* 카테고리 */}
        <div className="form-group">
          <label className="form-label">분류</label>
          <select
            name="categoryCode"
            value={form.categoryCode}
            onChange={handleChange}
            className="form-select"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* 제목 */}
        <div className="form-group">
          <label className="form-label">
            제목 <span className="required">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요 (최대 100자)"
            maxLength={100}
            className={`form-input ${errors.title ? 'input-error' : ''}`}
          />
          <div className="form-footer">
            {errors.title ? (
              <span className="error-msg">{errors.title}</span>
            ) : (
              <span />
            )}
            <span className="char-count">{form.title.length} / 100</span>
          </div>
        </div>

        {/* 내용 */}
        <div className="form-group">
          <label className="form-label">
            내용 <span className="required">*</span>
          </label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
            rows={12}
            className={`form-textarea ${errors.content ? 'input-error' : ''}`}
          />
          {errors.content && (
            <span className="error-msg">{errors.content}</span>
          )}
        </div>

        {/* 버튼 영역 */}
        <div className="btn-area">
          <button
            className="btn btn-secondary"
            onClick={handleCancel}
            disabled={isSaving}
          >
            취소
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving
              ? '저장 중...'
              : isEditMode
              ? '수정 완료'
              : '등록'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardWritePage;
