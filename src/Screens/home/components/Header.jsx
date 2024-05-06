import {useNavigate} from "react-router-dom";

const Header = () => {
  const navigation = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center shadow-lg p-4 border rounded-lg ">
        <button
          className="btn btn-primary btn-sm md:btn-md"
          onClick={() => navigation("/new")}>
          + new idea
        </button>
        <h2 className="font-bold text-sm md:text-2xl">Tempat naro bacotan</h2>
        <div className="flex gap-2 items-center">
          <img src="" className="w-10 h-10 rounded-full" />
          <h2 className="font-bold text-sm hidden md:block">amba tokum</h2>
        </div>
      </div>
    </>
  );
};

export default Header;
