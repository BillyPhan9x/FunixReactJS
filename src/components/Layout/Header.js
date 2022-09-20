import React from "react";

import HeaderCartButton from "./HeaderCartButton";
import image from "../../assets/meals.jpg"; // gives image path

import styles from "./Header.module.css";
// Adding a "Header" Component
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={image} alt="this is food order images" />
      </div>
    </React.Fragment>
  );
};

export default Header;

//  Phần Header này sẽ render giao diện header
