/* eslint-disable react/prop-types */
import {useEffect, useState} from "react";
import {db} from "../../../../utils";
import {Komentar} from "../../../../utils/schema";
import {
  downvote,
  upvote,
  checkIsAlreadyVoted,
  checkIsAlreadyDownVoted,
} from "../../../services";
import {desc, eq} from "drizzle-orm";
import {useLocation} from "react-router-dom";

const Like = ({comment}) => {
  const location = useLocation();
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    GetLikes();
  }, [location]);

  const GetLikes = async () => {
    const result = await db
      .select()
      .from(Komentar)
      .limit(20)
      .orderBy(
        desc(
          location.hash === "#hot" || location.hash === "#top"
            ? Komentar.vote
            : Komentar.id
        )
      );
    setLikes(result);
  };

  const upvoteHandler = async () => {
    if (upvote(comment.id)) {
      const updatedVote = comment.vote + 1; // Mengupdate vote di sini
      const result = await db
        .update(Komentar)
        .set({vote: comment.vote + 1})
        .where(eq(Komentar.id, comment.id))
        .returning({id: Komentar.id});
      if (result) {
        GetLikes();
        comment.vote = updatedVote; // Update state comment.vote
        setLikes([...likes]); // Memperbarui state likes
      }
    }
  };

  const downvoteHandler = async () => {
    if (downvote(comment.id)) {
      const updatedVote = comment.vote - 1; // Mengupdate vote di sini
      const result = await db
        .update(Komentar)
        .set({vote: comment.vote - 1})
        .where(eq(Komentar.id, comment.id))
        .returning({id: Komentar.id});
      if (result) {
        GetLikes();
        comment.vote = updatedVote; // Update state comment.vote
        setLikes([...likes]); // Memperbarui state likes
      }
    }
  };

  return (
    <>
      <div>
        <h2
          className={`text-lg cursor-pointer ${checkIsAlreadyVoted ? "" : ""}`}
          onClick={upvoteHandler}>
          🔥
        </h2>
        <h2 className="text-lg rounded-md p-1">{comment.vote}</h2>
        <h2
          className={`text-lg cursor-pointer ${
            checkIsAlreadyDownVoted ? "bg-slate-300" : ""
          }`}
          onClick={downvoteHandler}>
          👎
        </h2>
      </div>
    </>
  );
};

export default Like;
