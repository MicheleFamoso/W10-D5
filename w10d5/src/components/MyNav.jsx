import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const MyNav = function ({ onSearchChange }) {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  // Recupera le ricerche precedenti dal localStorage
  useEffect(() => {
    const savedSearches =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (savedSearches.length) {
      // Puoi usarlo per visualizzare o gestire le ricerche precedenti
      console.log("Ricerche precedenti: ", savedSearches);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim() !== "") {
      // Salva la ricerca nel localStorage
      const savedSearches =
        JSON.parse(localStorage.getItem("searchHistory")) || [];
      if (!savedSearches.includes(searchText)) {
        savedSearches.push(searchText);
        localStorage.setItem("searchHistory", JSON.stringify(savedSearches));
      }
      onSearchChange(searchText);
      setSearchText(""); // Svuota il campo di ricerca
      navigate("/search");
    }
  };

  return (
    <Navbar expand="lg" data-bs-theme="dark" className="bg-info bg-gradient">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <i className="bi bi-tornado fs-2 text-black"></i>
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/" className="nav-link fs-4 text-black">
              TornadoWeather
            </Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search City"
              className="me-2 rounded-5"
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <Button
              type="submit"
              variant="outline-success"
              className="rounded-5"
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MyNav;
