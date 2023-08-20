import { Routes, Route } from "react-router-dom"
import Home from './page/home/Home';
import Order from './page/order/Order'
import Query from './page/query/Query'
import Ticket from './page/ticket/Ticket'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/query" element={<Query />} />
        <Route path="/ticket" element={<Ticket />} />
      </Routes>
    </>
  );
}

export default App;
