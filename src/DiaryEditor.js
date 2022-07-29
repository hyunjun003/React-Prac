import { useEffect, useState } from "react";
import React from "react";

const DiaryEditor = ({ onCreate }) => {
  const [state, setState] = useState({
    author: "",
    text: "",
    emotion: 1,
  });
  useEffect(() => {
    console.log("rendering");
  });

  const handleChangeState = (e) => {
    setState({
      ...state,

      [e.target.name]: e.target.value,
    });
  };

  const handleSumbit = () => {
    onCreate(state.author, state.text, state.emotion);
    alert("저장완료");
    setState({
      author: "",
      text: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea name="text" value={state.text} onChange={handleChangeState} />
      </div>
      <div>
        <span>오늘의 감정점수 :</span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSumbit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default React.memo(DiaryEditor);
