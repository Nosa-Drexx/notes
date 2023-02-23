import { useState } from "react";
import InputField from "./InputField";

const AddNotes = () => {
  const [add, setAdd] = useState({ id: "", data: "", show: false });
  return (
    <>
      {add.show && (
        <InputField
          id={add.id}
          data={add.data}
          type={"add"}
          setClose={setAdd}
        ></InputField>
      )}
      <button
        className="w-16 h-16  bg-cyan-400 rounded-full fixed bottom-10 right-1/2 shadow-xl z-10"
        onClick={() => setAdd((prev) => ({ ...prev, show: true }))}
      >
        <i className="fa-solid fa-plus text-4xl text-gray-200"></i>
      </button>
    </>
  );
};

export default AddNotes;
