import { navigate } from "astro:transitions/client";
import { FormEvent, useEffect } from "react";
import { submitFormHandler } from "../api";
import { Form } from "../components/form";

export const AuthFormView = ({
  path,
  isLogin,
}: {
  path: string;
  isLogin?: boolean;
}) => {
  const formId = "form";

  const submitHandler = (event: FormEvent): Promise<{ success: boolean }> => {
    const { name, email, password, confirmPassword } =
      event.target as HTMLFormElement;

    return submitFormHandler(
      {
        name: name?.value, // TODO: resolve typing
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword?.value,
      },
      path
    );
  };

  useEffect(() => {
    document.getElementById(formId)?.addEventListener("signed", () => {
      navigate("/sign-in");
      console.log("signed");
    });
    document.getElementById(formId)?.addEventListener("logged", () => {
      navigate("/");
      console.log("logged");
    });
    document.getElementById(formId)?.addEventListener("unsigned", () => {
      navigate("/sign-up");
      console.log("unsigned");
    });
  });

  return <Form id={formId} onSubmit={submitHandler} isLogin={isLogin} />;
};
