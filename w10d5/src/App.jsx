import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNav from "./components/MyNav";
import Weather from "./components/Weather";
import "./App.css";
import { useState } from "react";
import Home from "./components/Home";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function App() {
  const [searchVaule, setSearchValue] = useState("");

  const searchChange = (value) => {
    setSearchValue(value);
  };

  return (
    <BrowserRouter>
      <div className=" bg-dark bg-gradient min-vh-100 d-flex flex-column">
        <header className=" sticky-top">
          <MyNav onSearchChange={searchChange} />
        </header>

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/search"
              element={
                <>
                  <Container className=" mt-5">
                    <Row className=" justify-content-center">
                      <Col sm="12" md="6">
                        <Weather searchValue={searchVaule} key={searchVaule} />
                      </Col>
                    </Row>
                  </Container>
                </>
              }
            />
          </Routes>
        </main>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
