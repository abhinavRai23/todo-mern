import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import ManageNote from "./pages/ManageNote";
import { CreateNote } from "./pages/CreateNote";
import DeleteNote from "./pages/DeleteNote";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateNote />} />
      <Route path="/edit/:id" element={<ManageNote />} />
      <Route path="/delete/:id" element={<DeleteNote />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default Router;
