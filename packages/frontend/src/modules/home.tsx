import { Button } from "../components/button";
import { Title } from "../components/title";
import { writePost } from "../view-service";

export const Home = () => {
  const writePostHandler = async () => {
    await writePost();
  };

  return (
    <>
      <Title />
      <Button callback={writePostHandler} />
    </>
  );
};
