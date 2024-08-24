import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#f8f9fa", padding: "10px 0" }}>
      <Container className="text-center">
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} Team Member
          
        </p>
      </Container>
      <Container>Pachara Chotiyanont 6411361 </Container>
      <Container>JITRADA TEPSUTTINUN 6410725 </Container>
      <Container>PHUTTHIPHAT TATIYAWONGSOONTHORN 6410457 </Container>
    </footer>
  );
};

export default Footer;
