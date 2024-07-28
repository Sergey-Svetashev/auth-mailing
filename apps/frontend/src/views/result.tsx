import { Title } from "../components/title";

export const ResultNote = ({
  defaultText,
  isFail,
}: {
  defaultText: string;
  isFail?: boolean;
}) => {
  const message = JSON.parse(sessionStorage.getItem("app_data") || "").message;
  return (
    <div className="flex flex-col text-center h-screen align-middle justify-center p-10">
      <Title
        text={isFail ? "Sorry, there was a problem:" : "Congratulations!"}
      />
      <p>{message || defaultText}</p>
    </div>
  );
};
