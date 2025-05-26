import { GlobalProvider } from "./context/GlobalContext";

import Header from "./components/Header";
import DeviceList from "./pages/DeviceList";

function App() {

  return (
    <GlobalProvider>
      <Header />
      <DeviceList />
    </GlobalProvider>
  )
}

export default App;