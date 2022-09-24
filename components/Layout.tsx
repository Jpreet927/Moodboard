import React from "react";
import Nav from "./Navbar";

function Layout({ children }: any) {
    return (
        <div className="d-flex flex-column h-100">
            <Nav />
            {children}
        </div>
    );
}

export default Layout;
