import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import {FaLinkedin }  from "react-icons/fa"
const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/vivek_carpenter_?utm_source=qr&igsh=MTV1bHJ3YWtyY2I0ZQ==";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dlpgjh3mi/image/upload/v1721549851/vivek/dnnv1oqxrapr06czbwtp.jpg"
              alt="Founder"
            />
            <Typography>Vivek Carpenter</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @vivek_carpenter_.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.linkedin.com/in/vivek-carpenter-84845a242/"
              target="blank"
            >
              <FaLinkedin  className="youtubeSvgIcon" />
            </a>

            <a href="https://www.instagram.com/vivek_carpenter_?utm_source=qr&igsh=MTV1bHJ3YWtyY2I0ZQ==" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
