import Base from "./components/Base/Base";
import { TeamType } from "./variables/types";

export type RootStackParamList = {
  MainPage: undefined;
  TeamInfo: undefined;
  Schedule: undefined;
  Records: undefined;
  Registration: { team: TeamType, tournament: string };
  SignIn: undefined;
  Management: undefined;
};

export default function App() {
  return (
    <Base />
  );
}
