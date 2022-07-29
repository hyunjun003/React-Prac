import React, { useState } from "react";
import { useEffect } from "react";

const DiaryItem = ({
  onEdit,
  author,
  text,
  created_date,
  emotion,
  id,
  onRemove,
}) => {
  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제 하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const [isEdit, setIsEdit] = useState(false); //false로 된 상태이기 때문에 수정을 할수가 없다.
  const toggleIsEdit = () => setIsEdit(!isEdit); // toggle이 사용될 경우, isEdit의 값을 반전시킨다.

  const [localContent, setLocalContent] = useState(text); //textarea에 들어가는 애들 수정하는 state
  //useState 내부의 값을 text로 바꿔줌으로써 수정시 원래 있던 텍스트를 올린다.

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(text);
  }; //수정중 취소시 기존 입력값 초기화_ 수정전의 텍스트만 textarea에 남긴다.

  const handleText = () => {
    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div class="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 :{emotion}
        </span>
        <br />
      </div>

      <span className="date">
        {new Date(created_date).toLocaleDateString()}
      </span>
      <div className="text">
        {isEdit ? (
          <>
            <textarea
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{text}</>
        )}
      </div>

      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정취소</button>
          <button onClick={handleText}>수정완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
