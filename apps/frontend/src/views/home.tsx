import type { ApiError } from "../errors";
import { navigate } from "astro:transitions/client";
import { useEffect, useState } from "react";
import { PATH, USER_TOKEN_KEY, getPosts } from "../api";
import { ERRORS } from "../api/index.ts";
import { Title } from "../components/title";

export const Home = () => {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<{ title: string; message: string }>();
  const loginRedirectHandler = () => navigate(PATH.SIGN_IN);

  useEffect(() => {
    getPosts(token)
      .then((data) => setData(data))
      .catch((error: ApiError) => {
        error.statusCode === ERRORS.UNAUTHENTICATED &&
          setError({
            title: "Log in please.",
            message: `Your status is: ${error.message}`,
          });
      });
  }, []);

  return (
    <>
      {data && (
        <>
          <Title title={data.message} />
          {/* TODO: UI */}
        </>
      )}
      {error && (
        <div className="border-solid border-2 border-white-400 text-white pt-10 mt-10 max-w-80 mx-auto rounded-lg">
          <h1 className="font-bold text-3xl">{error.title}</h1>
          <p className="text-center text-2xl">{error.message}</p>
          <button onClick={loginRedirectHandler}>Sign In</button>
        </div>
      )}
    </>
  );
};
