import { writePost } from "../view-service";

export const Button = ({callback}: {callback: () => void}) => {
    return <button onClick={callback}>Click to add</button>
}