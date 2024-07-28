export const Button = ({
  callback,
  text = "Submit",
  type = "submit",
}: {
  callback?: () => void;
  text?: string;
  type?: "submit" | "button" | "reset";
}) => (
  <button className="btn" onClick={callback} type={type}>
    {text}
  </button>
);
