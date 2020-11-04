import React from "react"
import {Link} from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import "./footer.css"


const KontakFooter = () => {
    return (
        <Col md={5} className="colKontak">
            <div className="isiKontakFooter">
                <img src={`${process.env.PUBLIC_URL}/images/footer/aql-logo-footer.png`}></img>
                <div className="copyrightKontak">
                    <p>Copyright © 2020 AQL Peduli</p>
                    <p>All right reserved</p>
                </div>
                <div className="iconKontak">
                    <a href="#"><img src={`${process.env.PUBLIC_URL}/images/footer/ig.png`}></img></a>
                </div>
                <div className="iconKontak">
                    <a href="#"><img src={`${process.env.PUBLIC_URL}/images/footer/twitter.png`}></img></a>
                </div>
                <div className="iconKontak">
                    <a href="#"><img src={`${process.env.PUBLIC_URL}/images/footer/youtube.png`}></img></a>
                </div>
                <div className="iconKontak">
                    <a href="#"><img src={`${process.env.PUBLIC_URL}/images/footer/fb.png`}></img></a>
                </div>
            </div>
        </Col>
    )
}

const LinkFooter = () => {
    const link1 = ['Beranda', 'Profil', 'Berita', 'Kepedulian', 'Informasi', 'Khazanah', 'Donasi', 'Relawan']
    const link2 = ['Peduli Bencana', 'Peduli Masjid', 'Peduli Pangan', 'Peduli Kesehatan', 'Dapur Sedekah']
    const aqlPeduli = link1.map((value,idx)=>{
        return(
            <p key={idx}><Link to="/" style={{ color: `white`, textDecoration: `none` }}>{value}</Link></p>
        )
    })
    const kepedulian = link2.map((value,idx)=>{
        return(
            <p key={idx}><Link to="/" style={{ color: `white`, textDecoration: `none` }}>{value}</Link></p>
        )
    })
    return (
        <Col md={{ span: 6 }}>
            <Container>
                <Row>
                    <Col md={4}>
                        <h4><Link to="/" style={{ color: `white`, textDecoration:`none` }}>AQL Peduli</Link></h4>
                        <br></br>
                        {aqlPeduli}
                    </Col>
                    <Col md={4}>
                        <h4><Link to="/" style={{ color: `white`, textDecoration:`none` }}>Kepedulian</Link></h4>
                        <br></br>
                        {kepedulian}
                    </Col>
                    <Col md={4}>
                    <h4><Link to="/" style={{ color: `white`, textDecoration:`none` }}>Berita Terbaru</Link></h4>
                        <br></br>
                        <p><Link to="/" style={{ color: `white`, textDecoration: `none` }}>Mengintip Kemeriahan Semarak Muharram AQL</Link></p>
                    </Col>
                </Row>
            </Container>
        </Col>
    )
}

const footer = (props) => {
    return (
        <div className="container-fluid no-padding" style={{
            backgroundColor: `#2F3990`, position: `relative`,
            bottom: `0`,
            lineHeight: `15px`,
            marginTop: `70px`,
            padding: `15px`,
            paddingTop: `35px`
        }}>
            <Row>
                <KontakFooter />
                <LinkFooter />
            </Row>
        </div>
    )
}

export default footer
