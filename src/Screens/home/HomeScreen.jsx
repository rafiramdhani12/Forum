/* eslint-disable no-unused-vars */
import {useLocation} from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Tabs from "./components/Tabs";
import {db} from "../../../utils";
import {Ideas, Komentar} from "../../../utils/schema";
import {useEffect, useState} from "react";
import {desc} from "drizzle-orm";
import IdeaList from "./components/IdeaList";

const HomeScreen = () => {
  const params = useLocation();
  const [ideaList, setIdeaList] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    GetAllIdeas();
  }, [params]);

  useEffect(() => {
    GetLikes();
  }, []);

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

  const GetLikes = async () => {
    const result = await db.select().from(Komentar);
    setLikes(result);
  };

  return (
    <>
      <Header />
      <Hero />
      <Tabs />
      <IdeaList IdeaList={ideaList} refreshData={GetAllIdeas} like={GetLikes} />
    </>
  );
};

export default HomeScreen;
