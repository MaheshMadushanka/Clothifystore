import React from "react";
import NavigationBar from "./NavigationBar/NavigationBar";
import Footer from "./Footer/Footer";

function Layout({children}){
    return(
        <div>
            <NavigationBar/>
            <main>{children}</main>
            <Footer/>
        </div>
    )
}
export default Layout;