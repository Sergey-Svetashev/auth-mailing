export const getPosts = async () => {
  return fetch("http://localhost:8082/get").then(async (result) => {
    return JSON.stringify(await result.json());
  });
};

export const writePost = async () => {
  return fetch("http://localhost:8082/add", {
    method: "POST",
  }).then(async (response) => {
    const res = await response.json();
    console.log("writePost result", res.result);
  });
};
