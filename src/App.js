import { useEffect } from "react";
import { useRef } from "react";
import { useMemo } from "react";
import { useReducer } from "react";
import { useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const create_date = new Date().getTime();
      const newItem = {
        ...action.data,
        create_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newText } : it
      );
    }
    default:
      return state;
  }
};

const App = () => {
  // const [data, setData] = useState([]);
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  const getData = async () => {
    //데이터를 하단의 링크에서 fetch해서 가져온다.
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments`
    ).then((res) => res.json());
    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        text: it.body,
        emotion: Math.floor(Math.random() * 5) + 1, //그냥 그렇구나 싶으면 됨.
        create_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    //마운트 시점에 실행하는 함수로, getData라는 함수가 선언된다.
    getData();
  }, []);

  const onCreate = (author, text, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, text, emotion, id: dataId.current },
    });
    dataId.current += 1;
  };

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  const onEdit = (targetId, newText) => {
    dispatch({ tpye: "EDIT", targetId, newText });
  };

  const getDiaryAnalysis = useMemo(() => {
    // 최적화 시키는 부분
    //useMemo를 사용하면, 더이상 함수가 아님. 그러므로 값으로 사용해야한다.
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]); //전체 data의 길이가 변할때만 변경되게 만든다.
  //이 부분은 중간에 있는 개수를 출력해내는 곳이다.

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; //여기에 getD..()가 아닌, getD..가 와야한다.

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분좋은 일기의 개수 : {goodCount}</div>
      <div>기분나쁜 일기의 개수 : {badCount}</div>
      <div>기분좋은 일기의 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} diaryProps={data} onRemove={onRemove} />
    </div>
  );
};
export default App;
