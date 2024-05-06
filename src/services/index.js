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
  const vote = JSON.parse(localStorage.getItem("vote"));

  vote.upvote.find((item) => item == id);
};

export const checkIsAlreadyDownVoted = (id) => {
  const vote = JSON.parse(localStorage.getItem("vote"));

  vote.downvote.find((item) => item == id);
};
