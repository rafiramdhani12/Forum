import {useState} from "react";
import "./App.css";
import HomeScreen from "./Screens/home/HomeScreen";
import {ThemeContext} from "./context/ThemeContext";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Newidea from "./Screens/NewIdea/Newidea";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeScreen />,
    },
    {
      path: "/new",
      element: <Newidea />,
    },
  ]);
  const [theme, setTheme] = useState("winter");
  return (
    <>
      <ThemeContext.Provider value={{theme, setTheme}}>
        <div
          className="flex flex-col items-center p-4 md:p-10 "
          data-theme={theme}>
          <div className="max-w-2xl w-full items-center">
            <RouterProvider router={router} />
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
