import {useLocation} from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Tabs from "./components/Tabs";
import {db} from "../../../utils";
import {Ideas} from "../../../utils/schema";
import {useEffect, useState} from "react";
import {desc} from "drizzle-orm";
import IdeaList from "./components/IdeaList";

const HomeScreen = () => {
  const params = useLocation();
  const [ideaList, setIdeaList] = useState([]);
  useEffect(() => {
    GetAllIdeas();
  }, [params]);

  const GetAllIdeas = async () => {
    const result = await db
      .select()
      .from(Ideas)
      .limit(20)
      .orderBy(
        desc(
          params.hash == "#hot" || params.hash == "#top" ? Ideas.vote : Ideas.id
        )
      );

    setIdeaList(result);
  };

  return (
    <>
      <Header />
      <Hero />
      <Tabs />
      <IdeaList IdeaList={ideaList} refreshData={GetAllIdeas} />
    </>
  );
};

export default HomeScreen;
