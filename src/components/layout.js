import React from "react"
import Navbar from "./navbar"
import Footer from "./footer"
import "./layout.css"

function Layout(props){
    return (
        <>
          <Navbar />
          <div
            style={{
              margin: `0 50px`,
              paddingTop: `120px`,
            }}
          >
            <main>{props.children}</main>
          </div>
          <Footer />
        </>
      )
}

export default Layout
