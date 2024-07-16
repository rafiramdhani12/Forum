/* eslint-disable react/prop-types */
import IdeaItem from "./IdeaItem";

const IdeaList = ({IdeaList, refreshData, like}) => {
  return (
    <>
      <div>
        {IdeaList.map((idea, index) => (
          <IdeaItem
            idea={idea}
            key={index}
            index={index}
            refreshData={refreshData}
            like={like}
          />
        ))}
      </div>
    </>
  );
};

export default IdeaList;
