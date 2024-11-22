import { BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import Workers from "./pages/Workers"
import Company from "./pages/Company"
import Settings from "./pages/Settings"


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/information/workers" element={<Workers/>}></Route>
        <Route path="/information/company" element={<Company/>}></Route>
        <Route path="/settings" element={<Settings/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
