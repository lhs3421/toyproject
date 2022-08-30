import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import InfiniteScroll from "./components/infiniteScroll/InfiniteScroll";
import Pagination from "./components/pagination/Pagination";
import Hsanswer from "./components/infiniteScroll/Hsanswer";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pagination" element={<Pagination />} />
        <Route path="/infinitescroll" element={<Hsanswer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
