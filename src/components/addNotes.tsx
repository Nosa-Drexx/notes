import { useState } from "react";
import InputField from "./InputField";

const AddNotes = () => {
  const [add, setAdd] = useState({ id: "", data: "", show: false });
  return (
    <div>
      {add.show && (
        <InputField
          id={add.id}
          data={add.data}
          type={"add"}
          setClose={setAdd}
        ></InputField>
      )}
      <button onClick={() => setAdd((prev) => ({ ...prev, show: true }))}>
        Add
      </button>
    </div>
  );
};

export default AddNotes;
