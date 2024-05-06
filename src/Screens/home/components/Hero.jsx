/* eslint-disable no-unused-vars */
import {useContext} from "react";
import {ThemeContext} from "../../../context/ThemeContext";

const Hero = () => {
  const {theme, setTheme} = useContext(ThemeContext);
  return (
    <>
      <div className="my-5 flex flex-col items-center gap-5">
        <h2 className="text-3xl font-bold text-center">
          Tempat naro bacotan taro apa aja
        </h2>
        <p>
          <small>mines fitur comment rek blm belajar gw woilah</small>
        </p>
        <h2 className="text-center my-3">
          <strong className="text-secondary font-bold text-lg">
            Like your favorites ideas.
          </strong>
          Write your best Ideas, No account needed!
        </h2>
        <div>
          <select
            onChange={(e) => setTheme(e.target.value)}
            className="select select-bordered border-primary w-full max-w-xs">
            <option disabled selected>
              Selected Theme
            </option>
            <option>light</option>
            <option>dark</option>
            <option>winter</option>
            <option>cupcake</option>
            <option>bumblebee</option>
            <option>emerald</option>
            <option>corporate</option>
            <option>synthwave</option>
            <option>retro</option>
            <option>cyberpunk</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Hero;
