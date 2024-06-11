import type { FocusEvent, FormEvent } from "react";
import { useRef, useState } from "react";

// TODO: add react-hook-form validation
export const Form = ({
  id = "form",
  onSubmit,
  isLogin,
}: {
  id: string;
  onSubmit: (event: FormEvent) => Promise<{ success: boolean }>;
  isLogin?: boolean;
}) => {
  const [errorStack, setErrorStack] = useState<Array<Record<string, string>>>(
    []
  );
  const form = useRef<HTMLFormElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const submitEvent = new CustomEvent(isLogin ? "logged" : "signed");

  const confirmPasswordCheck = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value !== password.current?.value) {
      setErrorStack((prev) => {
        prev.push({ [event.target.name]: "Passwords do not match!" });
        return [...prev];
      });
    } else {
      setErrorStack((prev) => {
        prev.splice(
          prev.findIndex((item) => item[event.target.name]),
          1
        );
        return [...prev];
      });
    }
  };

  const validatedSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!errorStack.length) {
      onSubmit(event)
        .then(({ success }) => {
          success && form.current?.dispatchEvent(submitEvent);
        })
        .catch(
          (error) =>
            error.statusCode === 400 &&
            form.current?.dispatchEvent(new CustomEvent("unsigned"))
        ); // TODO: Unify custom event usage.
    }
  };

  return (
    <form
      id={id}
      className="flex flex-wrap flex-col text-center self-center m-auto"
      method="POST"
      onSubmit={validatedSubmit}
      ref={form}
    >
      {!isLogin && (
        <div className="mt-3">
          <label className="block" htmlFor="name">
            Name
          </label>
          <input
            type="name"
            name="name"
            id="name"
            required
            defaultValue="New User"
          />
        </div>
      )}
      <div className="mt-3">
        <label className="block" htmlFor="email">
          E-Mail
        </label>
        <input type="email" name="email" id="email" required />
      </div>
      <div className="mt-3">
        <label className="block" htmlFor="password">
          Password
        </label>
        <input type="password" name="password" ref={password} required />
      </div>
      {!isLogin && (
        <div className="mt-3">
          <label className="block" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className={
              errorStack.find((item) => item.confirmPassword)
                ? `outline outline-2 outline-red-900`
                : ""
            }
            type="password"
            name="confirmPassword"
            ref={confirmPassword}
            onBlur={confirmPasswordCheck}
            required
          />
          {errorStack.find((item) => item.confirmPassword) && (
            <p className="text-red-300">
              {errorStack.find((item) => item.confirmPassword)?.confirmPassword}
            </p>
          )}
        </div>
      )}
      <button className="btn" type="submit">
        {isLogin ? "Log in" : "Sign up"}
      </button>
    </form>
  );
};
