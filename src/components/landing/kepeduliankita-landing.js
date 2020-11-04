import React, { useEffect, useState } from "react"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col, Button } from "react-bootstrap"
import {Link} from "react-router-dom"
import "./kepeduliankita-landing.css"
import ButtonBacaLagi from "../button-bacalagi"
import ButtonBacaLainnya from "../button-bacalainnya"

const Judul = () => {
    return (
        <Col>
            <div className="judulKepedulianKita">
                <div className="border-kita">
                    <h2>
                        Kepedulian Kita
                    </h2>
                </div>
            </div>
        </Col>
    )
}

function SliderKepedulianKita(props) {
    const teksBtn = "Baca Lebih Lanjut";
    const listKK = props.dataKk.map((doc, idx) => {
        var idxx = idx + 1
        var contentClass = "content content-" + idxx
        var imgClass = "img-" + idxx
        return (
            <div class="inner-part" key={idx}>
                <label for="imgTap" class="img">
                    <img class={imgClass} src={doc.gambarKk}></img>
                </label>
                <div class={contentClass}>
                    <span>{doc.tanggalKk}</span>
                    <div class="title">
                        {doc.judulKk}
                    </div>
                    <div class="text">
                        {doc.kontenKk}
                    </div>
                    <ButtonBacaLagi teks={teksBtn} link={`/kepeduliankita_${doc.idKk}`} />
                </div>
            </div>
        )
    })
    return (
        <div class="blog-card">
            <input type="radio" name="select" id="tap-1" checked></input>
            <input type="radio" name="select" id="tap-2"></input>
            <input type="radio" name="select" id="tap-3"></input>
            <input type="checkbox" id="imgTap"></input>
            <div class="sliders">
                <label for="tap-1" class="tap tap-1"></label>
                <label for="tap-2" class="tap tap-2"></label>
                <label for="tap-3" class="tap tap-3"></label>
            </div>
            {listKK}
        </div >
    )
}

const ButtonLainnya = () => {
    return (
        <Container>
            <Row>
                <Col style={{ textAlign: `center` }}>
                    <Link to={`/kepeduliankita`}>
                        <ButtonBacaLainnya teksBacaLainnya={`Lihat Lainnya`} />
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

function KepeduliankitaPart(){
    const urlKepeduliankita = "http://167.99.72.148/kepeduliankitas"
    const [kk, setKk] = useState([])
    useEffect(()=>{
        fetch(urlKepeduliankita).then(res => res.json()).then(parsedJson => parsedJson.map(data => (
            {
                idKk: `${data.id}`,
                judulKk: `${data.judulKepedulianKita}`,
                gambarKk: `http://167.99.72.148${data.gambarKepedulianKita.url}`,
                tanggalKk: `${data.created_at}`,
                kontenKk: `${data.kontenKepedulianKita}`
            }
        ))).then(
            items => setKk(items)
        )
    })

    return (
        <Container>
            <Row>
                <Judul />
            </Row>
            <br></br>
            <Row>
                <SliderKepedulianKita dataKk={kk} />
                <ButtonLainnya />
            </Row>
        </Container>
    )
}

export default KepeduliankitaPart