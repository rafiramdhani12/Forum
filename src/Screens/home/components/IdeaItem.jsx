/* eslint-disable react/prop-types */
import {eq} from "drizzle-orm";
import {db} from "../../../../utils/index";
import {Ideas} from "../../../../utils/schema";
import {
  downvote,
  upvote,
  checkIsAlreadyVoted,
  checkIsAlreadyDownVoted,
} from "../../../services";

const IdeaItem = ({idea, index, refreshData}) => {
  const upvoteHandler = async () => {
    // jika didalam parameter upvote tidak ada value maka fungsi nya tidak akan berjalan
    if (upvote(idea.id)) {
      const result = await db
        .update(Ideas)
        .set({vote: idea.vote + 1})
        .where(eq(Ideas.id, idea.id))
        .returning({id: Ideas.id});
      if (result) {
        refreshData();
      }
    }
  };

  const downVote = async () => {
    if (downvote(idea.id)) {
      const result = await db
        .update(Ideas)
        .set({vote: idea.vote - 1})
        .where(eq(Ideas.id, idea.id))
        .returning({id: Ideas.id});
      if (result) {
        refreshData();
      }
    }
  };

  return (
    <>
      <div className="my-5 border shadow-lg rounded-lg p-5 ">
        <div className="p-5 flex gap-7">
          <h2 className="flex gap-2">
            <span>{index + 1}</span> {idea?.content}
          </h2>
          <div className="flex flex-col items-center">
            <h2
              className={
                `text-lg hover:bg-gray-200 rounded-md p-1 cursor-pointer px-2 ${checkIsAlreadyVoted}` &&
                "bg-slate-300"
              }
              onClick={() => upvoteHandler()}>
              🔥
            </h2>
            <h2 className="text-lg rounded-md p-1">{idea.vote}</h2>
            <h2
              className={
                `text-lg hover:bg-gray-200 rounded-md p-1 cursor-pointer px-2 ${checkIsAlreadyDownVoted}` &&
                "bg-slate-300"
              }
              onClick={() => downVote()}>
              👎
            </h2>
          </div>
        </div>
        <h2 className="ms-4 mt-4 text-gray-400 text-sm">
          By @{idea.username} on {idea.createdAt}
        </h2>
      </div>
    </>
  );
};

export default IdeaItem;
