import React from 'react';
import '../css/app.css';
import { Container, Row, Col } from 'react-bootstrap';
import whyimg from '../images/studyonline.png';

export default function Why() {
    return (
        <Container fluid id='why'>
            <Row className='pt-5 why-section'>
                <Col xs={12} md={6} xl={6} className='p-5'>
                    <h1 className='why-title mt-5 pt-5'>Why QuizLinkUp ?</h1>
                    <Row className='mt-4'>
                <Col xs={12} md={6} xl={6}>
                    <h3>For educators</h3>
                        <p className='why-paragraphe'><span> 💡</span> Easy Quiz Creation</p>
                        <p className='why-paragraphe'><span> 💡</span> Track Progress Easily</p>
                        <p className='why-paragraphe'><span> 💡</span> Customize Your Quizzes</p>
                </Col>
                <Col xs={12} md={6} xl={6}>
                <h3>For students</h3>
                        <p className='why-paragraphe'><span> 📚 </span> Fun Learning Experience</p>
                        <p className='why-paragraphe'><span >📚 </span> Stay Engaged & Motivated</p>
                        <p className='why-paragraphe'><span >📚 </span> Study Anywhere, Anytime</p>
                </Col>
                    </Row>
                </Col>
                <Col xs={12} md={6} xl={6}>
                    <img src={whyimg} className='img-fluid pt-3' alt='whyimg'/>
                </Col>
            </Row>
        </Container>
    );
}

   