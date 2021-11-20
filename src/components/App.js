import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./ui/Header/header";
import theme from "./ui/Theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" component={() => <div>Home</div>} />
          <Route
            exact
            path="/services"
            component={() => {
              return <div>Services</div>;
            }}
          />
          <Route
            exact
            path="/customsoftware"
            component={() => <div>Custom software</div>}
          />
          <Route
            exact
            path="/mobileapps"
            component={() => <div>Mobile apps</div>}
          />
          <Route
            exact
            path="/websites"
            component={() => {
              return <div>Websites</div>;
            }}
          />
          <Route
            exact
            path="/revolution"
            component={() => <div>Revolution</div>}
          />
          <Route exact path="/about" component={() => <div>About</div>} />
          <Route exact path="/contact" component={() => <div>Contact</div>} />
          <Route exact path="/estimate" component={() => <div>Estimate</div>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
