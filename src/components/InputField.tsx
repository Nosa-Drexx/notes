import { Dispatch, useState } from "react";
import useContextHook from "../lib/useContextHook";

type InputFieldProps = {
  id: string;
  data: string;
  type: "edit" | "add";
  setClose: Dispatch<
    React.SetStateAction<{
      id: string;
      data: string;
      show: boolean;
    }>
  >;
};
const InputField = ({ id, data, type, setClose }: InputFieldProps) => {
  const { useContextGen } = useContextHook();
  const { dispatch } = useContextGen;
  const [state, setState] = useState(data);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (type === "edit") {
          //input  for edit cases
          dispatch({
            type: "edit",
            payload: {
              id,
              update: state,
            },
          });
        } else {
          //input  for add cases
          dispatch({
            type: "add",
            payload: {
              details: state,
            },
          });
        }
        setClose((prev) => ({ ...prev, show: false }));
      }}
    >
      <label htmlFor="text-area">
        <textarea
          id="text-area"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="Input or Edit note"
        ></textarea>
      </label>
      <label htmlFor="sumbit-btn">
        <button id="submit-btn" type="submit">
          Submit
        </button>
      </label>
    </form>
  );
};

export default InputField;
