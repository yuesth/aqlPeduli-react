import React, { useEffect, useState } from "react"
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col } from "react-bootstrap"
import ButtonBacaLagi from "../button-bacalagi"
import "./update-landing.css"

const JudulUpdate = () => {
    return (
        <Col>
            <div className="judulUpdate">
                <h2>
                    Update
                </h2>
                <div className="borderUpdate"></div>
            </div>
        </Col>
    )
}

function PerTiga(props) {
    const itemPerTiga = props.dataPerTiga.map((doc, idx) => {
        return (
            <div className="col-sm-12 col-lg-4" style={{ padding: `0 25px`, margin: `20px 0` }}>
                <div className="card" style={{ width: `auto`, margin: `auto`, height: `320px`, borderRadius: `40px` }}>
                    <div className="card-body">
                        <span>{doc.tanggalUp}</span>
                        <h4 className="card-title">{doc.namaUp}</h4>
                        <h6 className="card-title">{doc.judulProg}</h6>
                        <p className="card-text kontenUpdate">{doc.deskripsiUp}</p>
                        <ButtonBacaLagi teks="Cek" link={`/programs_Program_${doc.idProg}`} />
                    </div>
                </div>
            </div>
        )
    })
    return (
        <>
            {itemPerTiga}
        </>
    )
}

function ListUpdatee(props) {
    const p = props.dataUpdatee.length
    var perslide = []
    // while (props.dataUpdatee.length !== 0) {
    //     const pertiga = props.dataUpdatee.splice(0, 3)
    //     itemPerSlide.push(pertiga)
    // }
    for (var h = 0; h < p; h++) {
        var peritem = []
        for (var i = 0; i < 3; i++) {
            peritem.push(props.dataUpdatee.shift())
        }
        perslide.push(peritem)
    }
    const data3 = perslide.map(doc =>
        <div className="carousel-item active">
            <div className="container">
                <div className="row">
                    <p>{doc.namaUp}}</p>
                </div>
            </div>
        </div>
    )
    const data2 = perslide.map((doc, idx) => {
        return (
            <div className="carousel-item active">
                <div className="container">
                    <div className="row">
                        <PerTiga dataPerTiga={doc} />
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div className="col-md-12 div-satu">
            <div className="carousel slide" id="inam" data-ride="carousel">
                <div className="carousel-inner">
                    {data3}
                </div>
                <a href="#inam" class="carousel-control-prev div-previous" data-slide="prev">
                    <span class="carousel-control-prev-icon previous"></span>
                </a>
                <a href="#inam" class="carousel-control-next div-next" data-slide="next">
                    <span class="carousel-control-next-icon next"></span>
                </a>
            </div>
        </div>
    )
}

function ListUpdate(props) {
    return (
        <div className="col-md-12 div-satu">
            <div className="carousel slide" id="inam" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="container">
                            <div className="row">
                                <PerTiga dataPerTiga={props.dataUpdate} />
                            </div>
                        </div>
                    </div>
                </div>
                <a href="#inam" class="carousel-control-prev div-previous" data-slide="prev">
                    <span class="carousel-control-prev-icon previous"></span>
                </a>
                <a href="#inam" class="carousel-control-next div-next" data-slide="next">
                    <span class="carousel-control-next-icon next"></span>
                </a>
            </div>
        </div>
    )
}

function UpdatePart() {
    const urlUpdate = "http://167.99.72.148/update-programs"
    const [update, setUpdate] = useState([])
    useEffect(() => {
        fetch(urlUpdate).then(res => res.json()).then(parsedJson => setUpdate(parsedJson))
    })

    const itemUpdate = []
    update.map(doc => {
        if (doc.gambarUpdate !== null) {
            var item1 = {
                namaUp: doc.namaUpdate,
                judulProg: doc.program.judulProgram,
                idProg: doc.program.id,
                tanggalUp: doc.tanggalpelaksanaanUpdate,
                deskripsiUp: doc.deskripsiUpdate,
                gambarUp: doc.gambarUpdate.url
            }
            itemUpdate.push(item1)
        }
        else {
            var item2 = {
                namaUp: doc.namaUpdate,
                judulProg: doc.program.judulProgram,
                idProg: doc.program.id,
                tanggalUp: doc.tanggalpelaksanaanUpdate,
                deskripsiUp: doc.deskripsiUpdate,
            }
            itemUpdate.push(item2)
        }
    })
    const sortedItemUpdate = itemUpdate.sort((a, b) => { return new Date(b.tanggalUp) - new Date(a.tanggalUp) })
    return (
        <Container>
            <Row>
                <JudulUpdate />
            </Row>
            <br></br>
            <Row>
                <ListUpdate dataUpdate={sortedItemUpdate} />
            </Row>
        </Container>
    )
}

export default UpdatePart