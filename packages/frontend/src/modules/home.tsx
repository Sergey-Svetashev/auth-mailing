import { useEffect, useState } from "react";
import { Title } from "../components/title";
import { getPosts } from "../view-service";

type User = {
  name: string;
  posts: Array<{ title: string; text: string }>;
};

export const Home = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getPosts().then((result) => setUser(result));
  }, []);

  // TODO
//   const writePostHandler = async () => {
//     await createPost();
//   };

  return (
    <>
      {!user ? (
        "Loading..."
      ) : (
        <>
          <Title title={user.name} />
          <ul>
            {user.posts.map((post, index) => (
              <li key={`${index}_${String(Symbol())}`}>
                <b>{post.title}</b>
                <br />
                <p>{post.text}</p>
              </li>
            ))}
          </ul>
        </>
      )}
      {/* TODO */}
      {/* <Button callback={writePostHandler} text="Click to add" /> */}
    </>
  );
};
