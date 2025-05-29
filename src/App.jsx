import { GlobalProvider } from "./context/GlobalContext";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from "./components/Header";
import DeviceList from "./pages/DeviceList";
import DeviceDetails from "./pages/DeviceDetails";

function App() {

  return (
    <GlobalProvider>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DeviceList />} />
          <Route path="/device/:id" element={<DeviceDetails />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App;