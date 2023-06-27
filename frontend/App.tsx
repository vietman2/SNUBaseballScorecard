import React from "react";
import Base from "./components/Base/Base";
import { TeamInfoType } from "./variables/types";

export type RootStackParamList = {
  MainPage: undefined;
  TeamInfo: undefined;
  Schedule: undefined;
  Records: undefined;
  Registration: { team: TeamInfoType, tournament: string };
  SignIn: undefined;
  Management: undefined;
};

export default function App() {
  return (
    <Base />
  );
}
