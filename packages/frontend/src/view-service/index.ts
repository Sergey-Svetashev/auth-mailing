export const getPosts = async () => {
  return fetch("http://localhost:8082/get-user").then(async (result) => {
    return result.json();
  });
};

export const createPost = async () => {
  return fetch("http://localhost:8082/create", {
    method: "POST",
  }).then(async (response) => {
    const res = await response.json();
    console.log("writePost result", res.result);
  });
};
