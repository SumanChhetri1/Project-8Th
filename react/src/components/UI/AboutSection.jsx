import React from 'react'
import { Container,Row,Col } from 'reactstrap'
import '../../styles/about-section.css'
import aboutImg from'../../assets/all-images/about-img/about-2.jpg'
const AboutSection = ({aboutClass}) => {
  return (
   <section className='about__section' style={
    aboutClass === "aboutPage"
   ? { marginTop: "0px" }
   : { marginTop: "40px" }}>
    <Container>
        <Row>
            <Col lg='6' md='6'>
                <div className="about__section-content mt-5">
                    <h4 className="section__subtitle ">About Us</h4>
                    <h2 className="section__title">Welcome to Vechicle Rental System</h2>
                    <p className="section__description">
                    At our vehicle rental system, we make vehicle rentals simple, reliable, and affordable. Whether you need a car for a road trip, a van for moving, or an eco-friendly electric vehicle, we’ve got you covered. With a wide range of vehicles, easy booking, and top-notch customer service, 
                    we’re here to get you on the road quickly and hassle-free. Your journey starts with us! 
                    </p>
                    <div className="about__section-item d-flex align-item-center">
                     <p className="section__description d-flex align-items-center gap-2">
                        <i className="ri-checkbox-circle-line"></i>Welcome to Vechicle Rental System.
                     </p>

                     <p className="section__description d-flex align-items-center gap-2">
                        <i className="ri-checkbox-circle-line"></i>Come and book quality Vechicle.
                     </p>
                    </div>

                    <div className="about__section-item d-flex align-item-center gap-3">
                     <p className="section__description d-flex align-items-center gap-2">
                        <i className="ri-checkbox-circle-line"></i>Explore best Vechicles from us.
                     </p>

                     <p className="section__description d-flex align-items-center gap-2">
                        <i className="ri-checkbox-circle-line"></i>Easy access to variety of Vechicles.
                     </p>
                    </div>
                </div>
            </Col>

            <Col lg='6' md='6'>
                <div className="about__img mt-5">
                    <img src={aboutImg}
                    alt="" className='h-80 w-100'/>
                </div>
            </Col>
        </Row>
    </Container>
   </section>
  )
}

export default AboutSection
