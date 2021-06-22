import { createContext } from "react";

import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

const TestContext = createContext("");

function App() {
  return (
    <BrowserRouter>
      <TextContext.Provider value={"Teste"}>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </TextContext.Provider>
    </BrowserRouter>
  );
}

export default App;
