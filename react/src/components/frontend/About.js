import React from 'react';
import Helmet from '../../components/Helmet/Helmet' 
import AboutSection from '../../components/UI/AboutSection' 
import CommonSection from '../../components/UI/CommonSection' 
import OurMembers from '../../components/UI/OurMembers' 
import { Container,Row,Col } from 'reactstrap'
import equipment from '../../assets/all-images/about-img/about-3.jpg'
import '../../styles/about.css'



function About() {
    return  (
        <>
         <Helmet title='About' >
         <CommonSection title='About Us'/>
         <AboutSection  aboutClass='aboutPage'/>

                <section className='about__page-section mt-5'>
            <Container>
                <Row>
                <Col lg='6' md='6' sm='12'>
                    <div className="about__page-img">
                    <img src={equipment} alt="" className='w-100 rounded-3'/>
                    </div>
                </Col>

                <Col lg='6' md='6' sm='12'>
                    <div className="about__page-content">
                    <h2 className="section__title">We are commited to provide
                    quality and buget friendly produts.</h2>
                    <p className="section__description">
                     we are committed to providing a seamless and hassle-free vehicle rental experience tailored to meet your every need. Whether you're planning a family road trip, moving to a new home, or simply need a vehicle for a weekend getaway, we offer a diverse fleet of well-maintained vehicles, including sedans, SUVs, vans, electric cars, and more. 
                    </p>

                    <p className="section__description">
                    Our user-friendly platform makes it easy to browse, compare, and book the perfect vehicle in just a few clicks. We understand the importance of convenience, affordability, and reliability, which is why we go the extra mile to ensure our customers drive away with confidence and satisfaction.
                    </p>

                    <div className='d-flex align-items-center gap-3 mt-4'>
                        <span className='fs-4'>
                        <i className="ri-phone-line"></i>
                        </span>

                        <div>
                        <h6 className="section__subtitle">Need Any Help?</h6>
                        <h4>+977-9845612374</h4>
                        </div>
                    </div>
                    </div>
                </Col>
                </Row>
            </Container>
            </section>

            <section>
            <Container>
                <Row>
                <Col lg='12' className='mt-5 mb-5 text-center'>
                    <h6 className="section__subtitle">Experts</h6>
                    <h2 className="section__title">Our Members</h2>
                </Col>
                <OurMembers/>
                </Row>
            </Container>
            </section>
         </Helmet>
        


        </>
    )
}

export default About;
