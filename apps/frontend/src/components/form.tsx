import type { FormEvent } from "react";
import { Button } from "./button";

// TODO: add react-hook-form validation
export const Form = ({
  id = "form",
  onSubmit,
}: {
  id: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLogin?: boolean;
}) => (
  <form
    id={id}
    method="POST"
    className="max-w-64 mx-auto"
    onSubmit={onSubmit}
  >
    <div className="mt-3">
      <label className="block" htmlFor="name">
        Who are you?
      </label>
      <input id={`${id}-name`} type="name" name="userName" required placeholder="charlie.brown" />
    </div>

    <div className="mt-3">
      <label className="block" htmlFor="confirmPassword">
        What do you want for christmas?
      </label>
      <textarea id={`${id}-text`} name="text" required rows={5} />
    </div>
    <Button text="Send" />
  </form>
);
