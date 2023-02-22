import React from "react";
import useContextHook from "../lib/useContextHook";

const Notes = () => {
  const { useContextGen } = useContextHook();
  const { state, dispatch } = useContextGen;
  return (
    <section>
      {React.Children.toArray(
        state.trash.map((elem) => (
          <div>
            {elem.note}
            <div data-id={elem.id}>
              <button
                onClick={() =>
                  dispatch({ type: "delete", payload: { id: elem.id } })
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
