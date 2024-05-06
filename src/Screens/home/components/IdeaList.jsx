/* eslint-disable react/prop-types */
import IdeaItem from "./IdeaItem";

const IdeaList = ({IdeaList, refreshData}) => {
  return (
    <>
      <div>
        {IdeaList.map((idea, index) => (
          <IdeaItem
            idea={idea}
            key={index}
            index={index}
            refreshData={refreshData}
          />
        ))}
      </div>
    </>
  );
};

export default IdeaList;
