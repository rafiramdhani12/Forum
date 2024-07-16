/* eslint-disable react/prop-types */
import {useEffect, useState} from "react";
import {db} from "../../../../utils/index";
import {Komentar} from "../../../../utils/schema";
import {eq} from "drizzle-orm";

const Commentsection = ({ideaId}) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, [ideaId]);

  const getComments = async () => {
    try {
      const results = await db
        .select()
        .from(Komentar)
        .where(eq(Komentar.ideaId, ideaId))
        .execute();
      console.log("Comments for ideaId", ideaId, results); // Tambahkan log ini
      setComments(results);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  return (
    <div>
      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        comments.map((comment) => (
          <div className="text-black" key={comment.id}>
            {comment.comment} - {comment.username}
          </div>
        ))
      )}
    </div>
  );
};

export default Commentsection;
