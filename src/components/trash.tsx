import React from "react";
import useContextHook from "../lib/useContextHook";

const Trash = () => {
  const { useContextGen } = useContextHook();
  const { state, dispatch } = useContextGen;
  return (
    <section className="flex flex-col flex-nowrap items-center gap-10 pt-10">
      {state.trash.length === 0 ? (
        <div className="text-5xl w-full h-full flex items-center justify-center text-gray-300 ">
          <span> Trash Is Empty</span>
        </div>
      ) : (
        React.Children.toArray(
          state.trash.map((elem) => (
            <div className="w-full max-w-4xl h-auto shadow-lg p-4 rounded-xl text-xl">
              {elem.note}
              <div
                data-id={elem.id}
                className="flex gap-4 justify-end pl-3 pr-3"
              >
                <button
                  onClick={() =>
                    dispatch({ type: "restore", payload: { id: elem.id } })
                  }
                >
                  <i className="fa-solid fa-rotate-right text-gray-300"></i>
                </button>
                <button
                  className="text-red-400"
                  onClick={() =>
                    dispatch({ type: "delete", payload: { id: elem.id } })
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )
      )}
    </section>
  );
};

export default Trash;
