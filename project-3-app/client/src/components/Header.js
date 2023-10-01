import React from "react";
import Badge from "react-bootstrap/Badge";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/header.module.css";
import DonateComponent from "./Donate";

function Header() {

return (
  <div className={`p-4 ${styles.headerContainer}`}>
    <div className={styles.leftSide}></div>
    <h1 className={`text-center ${styles.headerText}`}>
      PostGame <Badge bg="secondary">Welcome!</Badge>
    </h1>
    <div className={styles.donate}>
      <DonateComponent />
    </div>
  </div>
);
}

export default Header;
