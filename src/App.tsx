import { BrowserRouter as Router,Routes,Route} from "react-router"
import CountryList from "./component/CountryList"
import Home from "./component/Home"
import Error from "./component/Error"
import CountryDetail from "./component/CountryDetail"
import About from "./component/AboutPage"
import Navbar from "./component/Navbar"
import ScrollToTop from "./component/ScrollToTop"


function App() {

  return (
    <>

      <Router>
        <ScrollToTop />
        <Navbar></Navbar>
        <Routes>
          <Route path="/About" element={<About/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/countrylist" element={<CountryList/>}></Route>
          <Route path="/countrydetail/:countryName" element={<CountryDetail/>}></Route>
          <Route path="/*" element={<Error/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
