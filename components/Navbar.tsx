import React from "react";
import { Navbar, NavbarBrand, Container, Button } from "react-bootstrap";
import Link from "next/link";

function Nav() {
    return (
        <Navbar>
            <Container>
                <NavbarBrand>Project Management</NavbarBrand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="p-3">
                        Current User: <a href="#login">Jp</a>
                    </Navbar.Text>
                    <Link href="" passHref>
                        <Button>Logout</Button>
                    </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Nav;
