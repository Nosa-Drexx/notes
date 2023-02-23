import React, { useState } from "react";
import useContextHook from "../lib/useContextHook";
import InputField from "./InputField";

const Notes = () => {
  const { useContextGen } = useContextHook();
  const { state, dispatch } = useContextGen;
  const [edit, setEdit] = useState({ id: "", data: "", show: false });
  return (
    <section>
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
          <div>
            {elem.note}
            <div data-id={elem.id}>
              <button
                onClick={() =>
                  !elem.stared
                    ? dispatch({ type: "star", payload: { id: elem.id } })
                    : dispatch({ type: "unstar", payload: { id: elem.id } })
                }
              >
                {elem.stared ? "UNSTAR" : "STAR"}
              </button>
              <button
                onClick={() =>
                  setEdit({ id: elem.id, data: elem.note, show: true })
                }
              >
                Edit
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "trash", payload: { id: elem.id } })
                }
              >
                Trash
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default Notes;
