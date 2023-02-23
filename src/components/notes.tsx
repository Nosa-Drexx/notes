import React, { useState } from "react";
import useContextHook from "../lib/useContextHook";
import InputField from "./InputField";

const Notes = () => {
  const { useContextGen } = useContextHook();
  const { state, dispatch } = useContextGen;
  const [edit, setEdit] = useState({ id: "", data: "", show: false });
  return (
    <section className="flex flex-col flex-nowrap items-center gap-10 pt-10">
      {edit.show && (
        <InputField
          id={edit.id}
          data={edit.data}
          type={"edit"}
          setClose={setEdit}
        ></InputField>
      )}
      {React.Children.toArray(
        state.notes.map((elem) => (
          <div className="w-full max-w-4xl h-auto shadow-lg p-4 rounded-xl text-xl">
            {elem.note}
            <div data-id={elem.id} className="flex gap-4 justify-end pl-3 pr-3">
              <button
                onClick={() =>
                  !elem.stared
                    ? dispatch({ type: "star", payload: { id: elem.id } })
                    : dispatch({ type: "unstar", payload: { id: elem.id } })
                }
              >
                {elem.stared ? (
                  <i className="fa-solid fa-star text-yellow-300"></i>
                ) : (
                  <i className="fa-solid fa-star text-cyan-100"></i>
                )}
              </button>
              <button
                onClick={() =>
                  setEdit({ id: elem.id, data: elem.note, show: true })
                }
              >
                <i className="fa-solid fa-pen-to-square text-cyan-400"></i>
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "trash", payload: { id: elem.id } })
                }
              >
                <i className="fa-solid fa-trash text-gray-300"></i>
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default Notes;
