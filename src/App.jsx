import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";

import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/Unauthorized" element={<Unauthorized />} />
          </Routes>
        </Router>
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
