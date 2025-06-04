import { GlobalProvider } from "./context/GlobalContext";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from "./components/Header";
import DeviceList from "./pages/DeviceList";
import DeviceDetails from "./pages/DeviceDetails";
import DeviceCompare from "./pages/DeviceCompare";
import AddDevice from "./pages/AddDevice";

function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<DeviceList />} />
          <Route path="/devices/:id" element={<DeviceDetails />} />
          <Route path="/devices/compare/:ids" element={<DeviceCompare />} />
          <Route path="/add" element={<AddDevice />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App;