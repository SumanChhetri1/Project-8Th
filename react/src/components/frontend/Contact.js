import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from '../../components/Helmet/Helmet' 
import CommonSection from '../../components/UI/CommonSection' 
import "../../styles/contact.css";
 

const socialLinks = [
    {
      url: "#",
      icon: "ri-facebook-line",
    },
    {
      url: "#",
      icon: "ri-instagram-line",
    },
    {
      url: "#",
      icon: "ri-linkedin-line",
    },
    {
      url: "#",
      icon: "ri-twitter-line",
    },
  ];
function Contact() {
    return  (
        <div>
         <Helmet title='Contact'>
        <CommonSection title="Contact Us" />
        <section>
        <Container>
            <Row>
            <Col lg="7" md="7">
                <h6 className="fw-bold mt-5 mb-4">Get In Touch</h6>

                <Form>
                <FormGroup className="contact__form">
                    <Input placeholder="Your Name" type="text" />
                </FormGroup>
                <FormGroup className="contact__form">
                    <Input placeholder="Email" type="email" />
                </FormGroup>
                <FormGroup className="contact__form message">
                    <textarea
                    rows="5"
                    placeholder="Message"
                    className="form-control"
                    ></textarea>
                </FormGroup>

                <button className=" contact__btn mb-4" type="submit">
                    Send Message
                </button>
                </Form>
            </Col>

            <Col lg="5" md="5">
                <div className="contact__info mt-5">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                4286 Narayanghat, Chitwan, Nepal
                </p>
                <div className=" d-flex align-items-center gap-2">
                    <h6 className="fs-6 mb-0">Phone:</h6>
                    <p className="section__description mb-0">+977-9863524141</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                    <h6 className="mb-0 fs-6">Email:</h6>
                    <p className="section__description mb-0"> vehiclerentalsystem@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                    {socialLinks.map((item, index) => (
                    <Link
                        to={item.url}
                        key={index}
                        className="social__link-icon fw-bold"
                    >
                        <i class={item.icon}></i>
                    </Link>
                    ))}
                </div>
                </div>
            </Col>
            </Row>
        </Container>
        </section>
    </Helmet>
        </div>
    )
}

export default Contact;
