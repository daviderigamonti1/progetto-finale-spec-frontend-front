import { GlobalProvider } from "./context/GlobalContext";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from "./components/Header";
import DeviceList from "./pages/DeviceList";
import DeviceDetails from "./pages/DeviceDetails";
import DeviceCompare from "./pages/DeviceCompare";

function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<DeviceList />} />
          <Route path="/devices/:id" element={<DeviceDetails />} />
          <Route path="/devices/compare/:id1/:id2" element={<DeviceCompare />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App;