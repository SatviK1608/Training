import AddUser from "./components/AddUser";
import DetailUser from "./components/DetailUser";
import Posts from "./components/Posts";
import { BrowserRouter, Route, Router, Switch ,Routes} from 'react-router-dom';
function App() {
  return (
    <div>
      <Routes>
        <Route  path="/" element={<DetailUser/>} />
        <Route path="/posts" element={<Posts/>} />
      </Routes>
    </div>
  );
}

export default App;
