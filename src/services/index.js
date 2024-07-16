export const upvote = (id) => {
  const vote = localStorage.getItem("votes")
    ? JSON.parse(localStorage.getItem("votes"))
    : {
        upvote: [],
        downvote: [],
      };

  if (vote.upvote.indexOf(id) !== -1) {
    return false;
  }
  vote.upvote.push(id);
  const downVote = vote.downVote?.filter((item) => item != id);
  vote.downVote = downVote;

  localStorage.setItem("votes", JSON.stringify(vote));
  return true;
};

export const downvote = (id) => {
  const vote = localStorage.getItem("votes")
    ? JSON.parse(localStorage.getItem("votes"))
    : {
        upvote: [],
        downvote: [],
      };

  if (vote.downvote.indexOf(id) !== -1) {
    return false;
  }
  vote.downvote.push(id);
  const upvote = vote.upvote?.filter((item) => item != id);
  vote.upvote = upvote;

  localStorage.setItem("votes", JSON.stringify(vote));
  return true;
};

export const checkIsAlreadyVoted = (id) => {
  const vote = JSON.parse(localStorage.getItem("votes")); // Gunakan "votes" bukan "vote" untuk sesuai dengan penyimpanan lokal

  return vote.upvote.includes(id); // Mengembalikan true jika id ditemukan dalam upvote
};

export const checkIsAlreadyDownVoted = (id) => {
  const vote = JSON.parse(localStorage.getItem("votes")); // Gunakan "votes" bukan "vote" untuk sesuai dengan penyimpanan lokal

  return vote.downvote.includes(id); // Mengembalikan true jika id ditemukan dalam downvote
};
