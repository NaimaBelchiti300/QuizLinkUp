import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import whyimg from '../images/studyonline.png';

export default function Why() {
    return (
        <Container fluid>
            <Row className='pt-5 why-section'>
                <Col xs={12} md={6} xl={6} className='p-5'>
                    <h1 className='why-title mt-5'>Why QuizLinkUp ?</h1>
                    <Row className='mt-4'>
                <Col xs={12} md={6} xl={6}>
                    <h3>For educators</h3>
                        <p><span> 💡</span> Easy Quiz Creation</p>
                        <p><span> 💡</span> Track Progress Easily</p>
                        <p><span> 💡</span> Customize Your Quizzes</p>
                </Col>
                <Col xs={12} md={6} xl={6}>
                <h3>For students</h3>
                        <p><span> 📚 </span> Fun Learning Experience</p>
                        <p><span >📚 </span> Stay Engaged & Motivated</p>
                        <p><span >📚 </span> Study Anywhere, Anytime</p>
                </Col>
                    </Row>
                </Col>
                <Col xs={12} md={6} xl={6}>
                    <img src={whyimg} className='img-fluid' alt='whyimg'/>
                </Col>
            </Row>
        </Container>
    );
}

   