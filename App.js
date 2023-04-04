import React from "react"
import { StatusBar } from "expo-status-bar"

import Route from "./src/navigation/Route"

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      {/* <Header /> */}
      {/* Route Component */}
      <Route />
    </>
  )
}

export default App
