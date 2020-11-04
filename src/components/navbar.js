import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import "./navbar.css"

const NavbarBaru = () => {
    return (
        <Navbar bg="light" fixed="top" expand="lg">
            <Navbar.Brand href="/" className="brand">
                <img
                    src={`${process.env.PUBLIC_URL}/images/logo-aql.png`}
                    width="100"
                    height="60"
                    className="d-inline-block align-top"
                    alt="AQL logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="navbar-col-link">
                <Nav className=" navbar-link">
                    <Nav.Link href="/profil" className="item-link"><h4 style={{color:`black`, fontSize:`24px`}}>Profil</h4></Nav.Link>
                    <Nav.Link href="/" className="item-link"><h4 style={{color:`black`, fontSize:`24px`}}>Berita</h4></Nav.Link>
                    <Nav.Link href="/program" className="item-link"><h4 style={{color:`black`, fontSize:`24px`}}>Program</h4></Nav.Link>
                    <Nav.Link href="/" className="item-link"><h4 style={{color:`black`, fontSize:`24px`}}>Informasi</h4></Nav.Link>
                    <Nav.Link href="/" className="item-link"><h4 style={{color:`black`, fontSize:`24px`}}>Khazanah</h4></Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end navbar-btn">
                <a href="#"><button className="navbar-donasi">DONASI</button></a>
                <a href="#"><button className="navbar-relawan">RELAWAN</button></a> 
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarBaru