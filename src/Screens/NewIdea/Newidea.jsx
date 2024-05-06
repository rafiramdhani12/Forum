import {ChevronLeft, Info, Send} from "lucide-react";
import Header from "../home/components/Header";
import {useEffect, useState} from "react";
import {db} from "../../../utils";
import {Ideas} from "../../../utils/schema";
import moment from "moment";
import {useNavigate} from "react-router-dom";

const Newidea = () => {
  const navigation = useNavigate();
  const [idea, setIdea] = useState();
  const [username, setUsername] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [existingUSer, setExistingUser] = useState(false);

  useEffect(() => {
    {
      setUsername(localStorage.getItem("username"));
      setExistingUser(true);
    }
  }, []);

  const onSaveHandler = async () => {
    // logic to save data
    const result = await db
      .insert(Ideas)
      .values({
        content: idea,
        username: username,
        createdAt: moment().format("DD MM yyyy"),
      })
      .returning({id: Ideas.id});
    if (result) {
      // jika tidak ada value nya maka akan terjadi error ,username lah value nya
      localStorage.setItem("username", username);
      setUsername("");
      setIdea("");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  return (
    <>
      <Header />

      {showAlert && (
        <div role="alert" className="alert alert-success mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your idea has been confirmed!</span>
        </div>
      )}
      <button className="btn mt-7 " onClick={() => navigation("/")}>
        <ChevronLeft />
        back
      </button>
      <h2 className="font-bold text-2xl mt-5">
        From Concept to Creation : Empowering your startup your journey
      </h2>
      <div className="flex flex-col mt-7 gap-2">
        <label>Your Idea *</label>
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="textarea textarea-bordered border-primary"
          placeholder="Write your Idea"></textarea>
      </div>
      {existingUSer && (
        <div className="flex flex-col mt-7 gap-2">
          <label className="flex justify-between">
            Your Username *
            <span className="flex items-center gap-2">
              <Info /> No account needed
            </span>
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="input input-bordered w-full border-primary"
          />
        </div>
      )}
      <button
        disabled={!(idea || username)}
        onClick={() => onSaveHandler()}
        className="btn w-full btn-primary mt-10">
        Send
        <Send className="h-4 w-4" />
      </button>
    </>
  );
};

export default Newidea;
