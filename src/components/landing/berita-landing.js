import React, { useEffect, useState } from "react"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col } from "react-bootstrap"
import "./berita-landing.css"
import {Link} from "react-router-dom"
import ButtonBacaLagi from "../button-bacalagi"
import ButtonBacaLainnya from "../button-bacalainnya"

const JudulBerita = () => {
    return (
        <Col style={{ textAlign: `center` }}>
            <div className="judulBerita">
                <h2>
                    Berita Terbaru
                </h2>
                <div className="borderBerita"></div>
            </div>
        </Col>
    )
}

// function BeritaUtama(props) {
//     let prom = (data) => new Promise((resolve, reject) => {
//         resolve(data)
//     })
//     prom(props).then(
//         res => {
//             const gambar = res.databerut.gambar
//             return (
//                 <Col>
//                     <div className="container div-berut">
//                         <a href="#" >
//                             <div className="div-img-berut">
//                                 <img src={gambar} class="img-fluid img-berut" alt="Responsive image"></img>
//                             </div>
//                             <div className="caption-berut">
//                                 <span style={{ fontSize: `14px`, textDecoration: `none`, color: `black` }}>{res.databerut.tanggal}</span>
//                                 <h3 style={{ fontSize: `44px`, textDecoration: `none`, color: `black` }}>{res.databerut.judul}</h3>
//                             </div>
//                         </a>
//                     </div>
//                 </Col>
//             )
//         }
//     )
// }

function BeritaLain(props) {
    const item = props.dataBeritaLain.map((doc, idx) => {
        if (idx !== 0 && idx < 5) {
            return (
                <Col md={3} className="colBerita">
                    <div className="card card-berita">
                        <img src={doc.gambar} width="270" height="300" alt="" />
                        <Link to="" className="link-judul">
                                <h6 style={{ textDecoration: `none`, color: `black` }} className="text-judul">{doc.judul}</h6>
                        </Link>
                        <Container>
                            <Row>
                                <Col md={5} style={{ textAlign: `left`, fontSize: `10px`, padding:`0` }}>
                                    <p>Pendayagunaan</p>
                                </Col>
                                <Col md={{ span: `6`, offset: `1` }} style={{ textAlign: `right`, fontSize: `10px`, padding:`0` }}>
                                    <p>{doc.tanggal}</p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Col>
            )
        }
    })
    return (
        <>
            {item}
        </>
    )
}

function BeritaPart() {
    const urlBerita = "http://167.99.72.148/beritas"
    const [berita, setBerita] = useState([])

    useEffect(() => {
        fetch(urlBerita).then(res => res.json()).then(parsedJson => setBerita(parsedJson))
    })
    const itemBerita = []
    berita.map(data => {
        if (data.gambarBerita !== null) {
            var item1 = {
                penulis: `${data.penulisBerita}`,
                tanggal: `${data.tanggalBerita}`,
                judul: `${data.judulBerita}`,
                isi: `${data.isiBerita}`,
                tag: `${data.tagBerita}`,
                gambar: `http://167.99.72.148${data.gambarBerita.url}`,
                kategori: `${data.kategoriberita.namaKategori}`
            }
            itemBerita.push(item1)
        }
        else {
            var item2 = {
                penulis: `${data.penulisBerita}`,
                tanggal: `${data.tanggalBerita}`,
                judul: `${data.judulBerita}`,
                isi: `${data.isiBerita}`,
                tag: `${data.tagBerita}`,
                kategori: `${data.kategoriberita.namaKategori}`
            }
            itemBerita.push(item2)
        }
    })

    const sortedItemBerita = itemBerita.sort((a, b) => { return new Date(b.tanggal) - new Date(a.tanggal) })
    const beritaUtama = sortedItemBerita.map((doc, idx) => {
        if (idx == 0) {
            return (
                <Col>
                    <div className="container div-berut">
                        <a href="#" >
                            <div className="div-img-berut">
                                <img src={doc.gambar} class="img-fluid img-berut" alt="Responsive image"></img>
                            </div>
                            <div className="div-caption-berut">
                                <span style={{ fontSize: `14px`, textDecoration: `none`, color: `black` }}>{doc.tanggal}</span>
                                <h3 style={{ fontSize: `44px`, textDecoration: `none`, color: `black` }}>{doc.judul}</h3>
                            </div>
                        </a>
                    </div>
                </Col>
            )
        }
    })
    return (
        <Container>
            <Row>
                <JudulBerita />
            </Row>
            <br></br>
            <Row>
                {beritaUtama}
            </Row>
            <Row>
                <BeritaLain dataBeritaLain={sortedItemBerita}></BeritaLain>
            </Row>
        </Container>
    )
}

export default BeritaPart;