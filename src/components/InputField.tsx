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
      className=" flex flex-col flex-nowrap w-screen h-screen absolute z-40 top-0 bg-white"
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
      <label htmlFor="sumbit-btn" className="h-auto w-screen bg-gray-100 ">
        <button
          id="submit-btn"
          type="submit"
          className="text-2xl bg-green-300 p-1 px-2"
        >
          Update
        </button>
      </label>
      <label htmlFor="text-area" className="h-full w-screen">
        <textarea
          id="text-area"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="Input or Edit note"
          className="w-full h-full p-2 text-2xl resize-none bg-yellow-200"
        ></textarea>
      </label>
    </form>
  );
};

export default InputField;
