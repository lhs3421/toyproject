import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import InfiniteScroll from "./pages/InfiniteScroll/InfiniteScroll";
import Pagination from "./pages/Pagination/Pagination";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pagination" element={<Pagination />} />
        <Route path="/infinitescroll" element={<InfiniteScroll />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
