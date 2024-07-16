/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import {eq} from "drizzle-orm";
import {db} from "../../../../utils/index";
import {Ideas, Komentar} from "../../../../utils/schema";
import {
  downvote,
  upvote,
  checkIsAlreadyVoted,
  checkIsAlreadyDownVoted,
} from "../../../services";
import {MessageCircle} from "lucide-react";
import {useState, useEffect} from "react";
import moment from "moment";
import Like from "./Like";

const IdeaItem = ({idea, index, refreshData}) => {
  const [commentVisible, setCommentVisible] = useState(false);
  const [comments, setComments] = useState({});
  const [username, setUsername] = useState("");
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch comments when component mounts
    const fetchComments = async () => {
      const result = await db
        .select()
        .from(Komentar)
        .where(eq(Komentar.ideaId, idea.id)); // Assume Comment schema has ideaId

      setComments((prevComments) => ({
        ...prevComments,
        [idea.id]: result || [],
      }));
    };

    fetchComments();
  }, [idea.id]);

  const upvoteHandler = async () => {
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

  const toggleComments = () => {
    setCommentVisible(!commentVisible);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    const result = await db
      .insert(Komentar)
      .values({
        comment: newComment,
        username: username,
        createdAt: moment().format("DD MM yyyy"),
        ideaId: idea.id, // Assume Comment schema has ideaId
      })
      .returning({id: Komentar.id});

    if (result) {
      setComments((prevComments) => ({
        ...prevComments,
        [idea.id]: [
          ...(prevComments[idea.id] || []),
          {
            id: result[0].id,
            comment: newComment,
            username: username,
            createdAt: moment().format("DD MM yyyy"),
          },
        ],
      }));
      setUsername("");
      setNewComment("");
    }
  };

  return (
    <div className="my-5 border shadow-lg rounded-lg p-5">
      <div className="p-5 flex gap-7">
        <h2 className="flex gap-2">
          <span>{index + 1}</span> {idea?.content}
        </h2>
        <div className="flex flex-col items-center">
          <h2
            className={`text-lg hover:bg-gray-200 rounded-md p-1 cursor-pointer px-2 ${
              checkIsAlreadyVoted ? "bg-slate-300" : ""
            }`}
            onClick={() => upvoteHandler()}>
            🔥
          </h2>
          <h2 className="text-lg rounded-md p-1">{idea.vote}</h2>
          <h2
            className={`text-lg hover:bg-gray-200 rounded-md p-1 cursor-pointer px-2 ${
              checkIsAlreadyDownVoted ? "bg-slate-300" : ""
            }`}
            onClick={() => downVote()}>
            👎
          </h2>
        </div>
      </div>
      <div className="flex justify-between">
        <h2 className="ms-4 mt-4 text-gray-400 text-sm">
          By @{idea.username} on {idea.createdAt}
        </h2>
        <div className="mt-2 cursor-pointer" onClick={toggleComments}>
          <MessageCircle width={20} />
        </div>
      </div>
      {commentVisible && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          {(comments[idea.id] || []).map((comment) => (
            <div key={comment.id} className="mb-2">
              <div>{comment.comment}</div>
              <div className="text-sm text-gray-500 flex justify-between">
                By @{comment.username} on {comment.createdAt}
                <Like comment={comment} />
              </div>
            </div>
          ))}
          <div className="mt-4">
            <input
              type="text"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Add username"
              className="w-full p-2 border rounded-md"
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-2 p-2 bg-blue-500 text-white rounded-md">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaItem;
