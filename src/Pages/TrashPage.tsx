import { Link } from "react-router-dom";
import Trash from "../components/trash";

const TrashPage = () => {
  return (
    <section>
      <header className="w-screen h-auto flex justify-between bg-gray-100 p-2 text-2xl">
        <h1>Recycle Bin</h1>
        <ul className="list-none flex gap-4">
          <li>
            <Link to="/" className="underline">
              Notes
            </Link>
          </li>
          <li>
            <Link to="/stared" className="underline">
              Stared
            </Link>
          </li>
        </ul>
      </header>
      <Trash />
    </section>
  );
};

export default TrashPage;
