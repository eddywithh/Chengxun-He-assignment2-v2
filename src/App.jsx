import Header from "./Header"
import Home from "./pages/Home"
import Simulation from "./pages/Simulation"
import Credits from "./pages/Credits"

 
function App(){
  let Component
  switch (window.location.pathname){
    case "/":
      Component = Home
      break
    case "/home":
      Component = Home
      break
    case "/simulation":
      Component = Simulation
      break
    case "/credits":
      Component = Credits
      break

  }
  return (
    <>
      <Header/>
      <Component/>
    </>
  )
}

export default App;