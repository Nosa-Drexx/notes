import React from "react";
import useContextHook from "../lib/useContextHook";

const Notes = () => {
  const { useContextGen } = useContextHook();
  const { state, dispatch } = useContextGen;
  return (
    <section>
      {React.Children.toArray(
        state.notes.map((elem) => (
          <div>
            {elem.note}
            <div data-id={elem.id}>
              <button
                onClick={() =>
                  dispatch({ type: "star", payload: { id: elem.id } })
                }
              ></button>
              <button
                onClick={() =>
                  dispatch({ type: "trash", payload: { id: elem.id } })
                }
              ></button>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default Notes;
