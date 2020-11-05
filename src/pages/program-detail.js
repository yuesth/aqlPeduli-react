import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Breadcrumb, ProgressBar, Button, Tabs, Tab, Dropdown, DropdownButton } from "react-bootstrap"
import Layout from "../components/layout"
import "./program-detail.css"

function SisaHari(props) {
    var hariTerakhir = new Date(new Date(props.tanggal).getTime() + (props.durasi * 24 * 60 * 60 * 1000));
    var sisaHari = Math.floor((hariTerakhir.getTime() - new Date().getTime()) / (1000 * 3600 * 24))
    return (
        <span>{sisaHari.toString()} hari lagi</span>
    )
}

function TimelineUpdate(props) {
    const listUpdate = props.update.map((doc, idx) => {
        var gambarup = `http://167.99.72.148${doc.url}`
        return (
            <li className="timeline-item bg-white rounded ml-3 p-4">
                <div className="timeline-arrow">
                    <h2 className="h5 mb-0">
                        {doc.namaUpdate}
                    </h2>
                    <span className="small text-gray">
                        <i class="fa fa-clock-o mr-1"></i>
                        {doc.tanggalpelaksanaanUpdate}
                    </span>
                    <p className="text-small mt-2 font-weight-light">
                        {doc.deskripsiUpdate}
                    </p>
                    {doc.gambarUpdate !== null && <img src={gambarup} id="gambar-update"></img>}
                </div>
            </li>
        )
    })
    return (
        <div className="col mx-auto">
            <ul className="timeline">
                {listUpdate}
            </ul>
        </div>
    )
}

function ControlledTabs(props) {
    const [key, setKey] = useState('cerita');
    // const timelineup = props.update.map((doc, idx) => {
    //     var gambarup = `http://167.99.72.148${doc.url}`
    //     return (
    //         <li className="timeline-item bg-white rounded ml-3 p-4">
    //             <div className="timeline-arrow">
    //                 <h2 className="h5 mb-0">
    //                     {doc.namaUpdate}
    //                 </h2>
    //                 <span className="small text-gray">
    //                     <i class="fa fa-clock-o mr-1"></i>
    //                     {doc.tanggalpelaksanaanUpdate}
    //                 </span>
    //                 <p className="text-small mt-2 font-weight-light">
    //                     {doc.deskripsiUpdate}
    //                 </p>
    //                 {doc.gambarUpdate !== null && <img src={gambarup} id="gambar-update"></img>}
    //             </div>
    //         </li>
    //     )
    // })
    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
        >
            <Tab eventKey="cerita" title="Cerita">
                <div style={{ width: `auto`, height: `auto`, textAlign: `justify` }}>
                    <p>
                        {props.cerita}
                    </p>
                </div>
            </Tab>
            {/* <Tab eventKey="update" title="Update">
                <Row>
                     <TimelineUpdate update={props.update} />
                </Row>
            </Tab> */}
        </Tabs>
    );
}

function DetailProgram(props) {
    const id = props.match.params.id
    const urlDetailProgram = `http://167.99.72.148/programs/${id}`
    const [detailprog, setDetailprog] = useState([])
    useEffect(() => {
        fetch(urlDetailProgram).then(res => res.json()).then(parsedJson => (
            {
                id: `${parsedJson.id}`,
                judul: `${parsedJson.judulProgram}`,
                tanggal: `${parsedJson.created_at}`,
                total: `${parsedJson.totaldanaProgram}`,
                terkumpul: `${parsedJson.totalterkumpulProgram}`,
                durasi: `${parsedJson.durasiProgram}`,
                des: `${parsedJson.deskripsiProgram}`,
                gambar: `http://167.99.72.148${parsedJson.gambarProgram.url}`,
                cerita: `${parsedJson.cerita}`,
                namaKateg: `${parsedJson.kategori.namaKategori}`,
                update: `${parsedJson.update_programs}`
            }
        )).then(
            items => setDetailprog(items)
        )
    })
    const persenTerkumpul = (detailprog.terkumpul / detailprog.total) * 100
    // const timelineup = detailprog.update.map(doc => {
    //     var gambarup = `http://167.99.72.148${doc.url}`
    //     return (
    //         <li className="timeline-item bg-white rounded ml-3 p-4">
    //             <div className="timeline-arrow">
    //                 <h2 className="h5 mb-0">
    //                     {doc.namaUpdate}
    //                 </h2>
    //                 <span className="small text-gray">
    //                     <i class="fa fa-clock-o mr-1"></i>
    //                     {doc.tanggalpelaksanaanUpdate}
    //                 </span>
    //                 <p className="text-small mt-2 font-weight-light">
    //                     {doc.deskripsiUpdate}
    //                 </p>
    //                 {doc.gambarUpdate !== null && <img src={gambarup} id="gambar-update"></img>}
    //             </div>
    //         </li>
    //     )
    // })
    return (
        <Layout>
            <Container className="wadah">
                <Row>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/programdonasi" style={{ textDecoration: `none`, color: `#E92998` }}>Program Kepedulian</Breadcrumb.Item>
                            <Breadcrumb.Item active>{detailprog.judul}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col md={7}>
                        {detailprog.gambar !== null && <img src={detailprog.gambar} width="600" height="330"></img>
                        }
                    </Col>
                    <Col md={5}>
                        <div className="kop">
                            <h3>{detailprog.judul}</h3>
                            <p>
                                {detailprog.des}
                            </p>
                            <br />
                            <p>{detailprog.terkumpul !== null && detailprog.terkumpul} dari <strong>{detailprog.total !== null && detailprog.total}</strong></p>
                            <ProgressBar now={persenTerkumpul} label={`${persenTerkumpul} %`} />
                            {detailprog.durasi !== null && <SisaHari tanggal={detailprog.tanggal} durasi={detailprog.durasi} />
                            }
                            <div className="row">
                                <div className="col-md-7">
                                    <Button variant="success">DONASI SEKARANG</Button>
                                </div>
                                <div className="col-md-5">
                                    <Button variant="primary">BAGIKAN</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                         {detailprog.cerita !== null && <ControlledTabs cerita={detailprog.cerita} update={detailprog.update} />}
                        {/* <div className="col mx-auto">
                            <ul className="timeline">
                                {timelineup}
                            </ul>
                        </div> */}
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default DetailProgram