import {Plus} from "lucide-react";
import { Link } from "react-router";

function Navbar() {
  return (

    <header className="w-full bg-base-300 border-b border-base-content/10 p-4">
        <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
                <Link to="/">Todo App</Link>
            </div>
            <button className="btn btn-primary btn">
                <Link to="/create" className="flex items-center"><Plus className="size-5 inline mr-1" /> Create</Link>
            </button>
        </div>
    </header>
  )
}
export default Navbar;