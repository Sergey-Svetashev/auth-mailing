export const Button = ({
  callback,
  text = "Submit",
}: {
  callback: () => void;
  text?: string;
}) => <button onClick={callback}>{text}</button>;
