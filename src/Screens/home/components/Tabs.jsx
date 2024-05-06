import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const params = useLocation();

  useEffect(() => {
    setActiveTab(params.hash);
  }, [params]);

  return (
    <>
      <div role="tablist" className="tabs tabs-bordered">
        <a
          role="tab"
          onClick={() => setActiveTab(0)}
          className={`tab text-lg font-bold ${activeTab == 0 && "tab-active"}`}
          href="/#hot">
          Hot
        </a>
        <a
          role="tab"
          onClick={() => setActiveTab(1)}
          className={`tab text-lg font-bold ${activeTab == 1 && "tab-active"}`}
          href="/#new">
          New
        </a>
        <a
          role="tab"
          onClick={() => setActiveTab(2)}
          className={`tab text-lg font-bold ${activeTab == 2 && "tab-active"}`}
          href="/#top">
          Top
        </a>
      </div>
    </>
  );
};

export default Tabs;
