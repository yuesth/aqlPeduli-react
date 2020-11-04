import React, { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import "./kepedulian-landing.css"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"


const Judul = () => {
    return (
        <Col style={{ textAlign: `center` }}>
            <div className="judulKepedulian">
                <h2>
                    Kepedulian
                </h2>
                <div className="border"></div>
            </div>
        </Col>
    )
}

const ListKepedulian = (props) => {
    const arrGbr = ['natural-disaster', 'healthcare', 'jama-masjid', 'beverages', 'give-love']
    const listKategori = props.dataKateg.map((doc, idx) => {
        var pathGbr = `${process.env.PUBLIC_URL}/images/kepedulian/${arrGbr[idx]}.png`
        return (
            <Col style={{ textAlign: `center`, padding:`0` }} className="colKepedulian">
                <Link to={`/programdonasi_${doc.idKateg}`} className="card text-center" style={{margin:`auto auto`}}>
                    <div>
                        <img src={pathGbr} width="150" height="151"></img>
                        <h4 style={{fontSize:`20px`, fontWeight:`bold`}}>{doc.namaKateg}</h4>
                    </div>
                </Link>
            </Col>
        )
    })
    return (
        <Row>
            {listKategori}
        </Row>
    )
}

function KepedulianPart() {
    const urlKepedulian = "http://167.99.72.148/kategoris"
    const [kateg, setKateg] = useState([])
    useEffect(() => {
        fetch(urlKepedulian).then(res => res.json()).then(parsedJson => parsedJson.map(data => (
            {
                namaKateg: `${data.namaKategori}`,
                idKateg: `${data.idKategori}`
            }
        ))).then(
            items => setKateg(items)
        )
    }, [])

    return (
        <Container>
            <Row>
                <Judul />
            </Row>
            <br></br>
            <ListKepedulian dataKateg={kateg} />
        </Container>
    )
}

export default KepedulianPart;