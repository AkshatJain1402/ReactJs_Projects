import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
function Footer() {
  return (
    <div className="stickyFooter">
      <p>Where is my Bus</p>
      <div id="contactDiv">
        <p>Contact Us:+91 ----------</p>
        <div id="iconsFP">
          {" "}
          <a href="www.Instagram.com" target="_blank">
            {" "}
            <FontAwesomeIcon style={{ marginRight: 50 }} icon={faInstagram} />
          </a>
          <a href="www.Facebook.com" target="_blank">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
