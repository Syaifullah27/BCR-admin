import { RouterProvider } from "react-router-dom"
import { RouteList } from "./Routes/RouteList"
import "./App.css"

const App = () => {

  return <RouterProvider router={RouteList} />
}

export default App
