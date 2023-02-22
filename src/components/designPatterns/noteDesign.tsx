import React, { PropsWithChildren } from "react";
import useContextHook from "../../lib/useContextHook";

type ListType = {
  list: NoteObjType[] | NoteObjTypeStared[] | NoteObjTypeTrash[];
};

const NoteDesign = ({ children, list }: PropsWithChildren<ListType>) => {
  //   const { useContextGen } = useContextHook();
  //   const { dispatch } = useContextGen;
  return (
    <section>
      {React.Children.toArray(
        list.map((elem) => (
          <div>
            {elem.note}
            <div data-id={elem.id}>{children}</div>
          </div>
        ))
      )}
    </section>
  );
};

export default NoteDesign;
