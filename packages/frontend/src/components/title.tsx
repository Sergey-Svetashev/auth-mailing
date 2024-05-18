import { useEffect, useState } from "react";
import { getPosts } from "../view-service";

export const Title = () => {
  const [posts, setPosts] = useState<string>();

  useEffect(() => {
    getPosts().then((result) => setPosts(result));
  }, []);

  return <h1>{posts}</h1>;
};
