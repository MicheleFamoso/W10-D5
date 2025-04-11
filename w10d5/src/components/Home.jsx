import Container from "react-bootstrap/esm/Container";
import Weather from "./Weather";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const Home = function () {
  return (
    <Container>
      <Row className=" mt-5 ">
        <Col xs="12" md="4">
          <Weather searchValue="madrid" />;
        </Col>

        <Col xs="12" md="4">
          <Weather searchValue="parigi" />;
        </Col>
        <Col xs="12" md="4">
          <Weather searchValue="tokyo" />;
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
