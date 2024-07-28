import { navigate } from "astro:transitions/client";
import { FormEvent } from "react";
import { requestHandler } from "../api";
import { Form } from "../components/form";

export const MainForm = () => {
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { userName, text } = event.target as HTMLFormElement;

    requestHandler({
      name: userName.value,
      text: text.value,
    }).then((result) => {
      sessionStorage.setItem(
        "app_data",
        JSON.stringify({ message: result.message })
      );

      if (result.success) {
        navigate("/success");
      } else {
        navigate("/fail");
      }
    });
  };

  return <Form id="form" onSubmit={submitHandler} />;
};
