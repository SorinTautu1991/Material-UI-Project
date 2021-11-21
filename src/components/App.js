import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import theme from "./ui/Theme";

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={() => {
              return <div>Home</div>;
            }}
          />
          <Route exact path="/services" element={() => <div>Services</div>} />
          <Route
            exact
            path="/customsoftware"
            element={() => <div>Custom software</div>}
          />

          <Route
            exact
            path="/mobileapps"
            element={() => <div>Mobile apps</div>}
          />
          <Route exact path="/websites" element={() => <div>Websites</div>} />
          <Route
            exact
            path="/revolution"
            element={() => <div>Revolution</div>}
          />
          <Route exact path="/about" element={() => <div>About</div>} />
          <Route exact path="/contact" element={() => <div>Contact</div>} />
          <Route exact path="/estimate" element={() => <div>Estimate</div>} />
        </Routes>
        <Footer
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
