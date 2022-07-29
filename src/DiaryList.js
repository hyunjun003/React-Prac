import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryProps, onRemove, onEdit }) => {
  //여기 diaryProps에서 {}빼먹으면 console에는 출력되지만, map이나 length로 알아볼수가 없다.
  return (
    <div class="diaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryProps.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryProps.map((it) => (
          <DiaryItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
