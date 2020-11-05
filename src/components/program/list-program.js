import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Container, ProgressBar } from "react-bootstrap"
import "./list-program.css"
import { Link } from "react-router-dom"

function ListProgram() {
    const urlListProgram = "http://167.99.72.148/programs"
    const urlKateg = "http://167.99.72.148/kategoris"
    const [program, setProgram] = useState([])
    const [kateg, setKateg] = useState([])
    useEffect(() => {
        var btnContainer = document.getElementById("col-list");
        var btns = btnContainer.getElementsByClassName("kategoriBtn");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                var current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            });
        }
        fetch(urlListProgram).then(res => res.json()).then(parsedJson => parsedJson.map(data => (
            {
                id: `${data.id}`,
                judul: `${data.judulProgram}`,
                tanggal: `${data.created_at}`,
                gambar: `http://167.99.72.148${data.gambarProgram.url}`,
                total: `${data.totaldanaProgram}`,
                terkumpul: `${data.totalterkumpulProgram}`,
                durasi: `${data.durasiProgram}`,
                des: `${data.deskripsiProgram}`,
                namaKateg: `${data.kategori.namaKategori}`
            }
        ))).then(
            items => setProgram(items)
        ).then(res => filterSelection('all'))
        fetch(urlKateg).then(res => res.json()).then(parsedJson => parsedJson.map(data => (
            {
                id: `${data.id}`,
                namaKateg: `${data.namaKategori}`
            }
        ))).then(
            items => setKateg(items)
        )
    }, [])


    function DariTanggal(props) {
        var dariTanggal = new Date(props.tanggal)
        var string = dariTanggal.getDate().toString() + " " + dariTanggal.toLocaleString('default', { month: 'long' }) + " " + dariTanggal.getFullYear()
        return (
            <span style={{ fontSize: `10px` }}>{string}</span>
        )
    }

    function SisaHari(props) {
        var hariTerakhir = new Date(new Date(props.tanggal).getTime() + (props.durasi * 24 * 60 * 60 * 1000));
        var sisaHari = Math.floor((hariTerakhir.getTime() - new Date().getTime()) / (1000 * 3600 * 24))
        return (
            <span>{sisaHari.toString()} hari</span>
        )
    }

    function PersenTerkumpul(props) {
        var persen = (props.terkumpul / props.total) * 100;
        return (
            <ProgressBar now={persen} />
        )
    }

    function filterSelection(c) {
        var x, i;
        x = document.getElementsByClassName("item-donasi");
        if (c == "all") c = "";
        for (i = 0; i < x.length; i++) {
            RemoveClass(x[i], "show");
            if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
        }
    }

    function AddClass(element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
        }
    }

    function RemoveClass(element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            while (arr1.indexOf(arr2[i]) > -1) {
                arr1.splice(arr1.indexOf(arr2[i]), 1);
            }
        }
        element.className = arr1.join(" ");
    }

    const listProgram = program.map((doc, idx) => {
        var tostring = parseInt(doc.terkumpul)
        var idr = tostring.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        var namaKategori = doc.namaKateg
        var namaKategori2 = namaKategori.replace(/\s/g, "")
        var namaClass = "card item-donasi " + namaKategori2
        return (
            <div>
                <Link to={{pathname:`/program/${doc.id}`}}>
                    <div class={namaClass} style={{ width: `280px`, margin: `15px 10px`, height: `470px`, borderRadius: `20px`, color: `black` }}>
                        {doc.gambar !== null && <img src={doc.gambar} style={{ marginTop: `8px`, borderRadius: `5px` }} width="270" height="180"></img>
                        }
                        <div class="card-body" style={{ padding: `10px`, textAlign: `left` }}>
                            <DariTanggal tanggal={doc.tanggal}></DariTanggal>
                            <div style={{ width: `auto`, height: `60px` }}>
                                <h5 class="card-title titleListProgram">{doc.judul}</h5>
                            </div>
                            <p class="card-text kontenListProgram">{doc.des}</p>
                            <Container>
                                <Row>
                                    <Col md={5} style={{ textAlign: `left`, fontSize: `10px` }}>
                                        <p style={{ marginBottom: `5px` }}>Sisa Waktu</p>
                                        {doc.durasi !== null && <SisaHari tanggal={doc.tanggal} durasi={doc.durasi} />
                                        }
                                    </Col>
                                    <Col md={{ span: `6`, offset: `1` }} style={{ textAlign: `right`, fontSize: `10px` }}>
                                        <p style={{ marginBottom: `5px` }}>Terkumpul</p>
                                        <span>Rp.{idr}</span>
                                    </Col>
                                </Row>
                            </Container>
                            <br />
                            <div>
                                <PersenTerkumpul total={doc.total} terkumpul={doc.terkumpul}></PersenTerkumpul>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    })

    return (
        <div className="container" style={{ textAlign: `center` }}>
            <div className="row">
                <Col md={2} id="col-list">
                    <Row>
                        <Col style={{ textAlign: `center` }}>
                            <h4>Kategori</h4>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Container>
                            <Row>
                                <Col>
                                    <Button variant="default" onClick={() => filterSelection('all')} className="kategoriBtn active">Semua</Button>
                                </Col>
                            </Row>
                            <br />
                        </Container>
                        {kateg.map((doc, idx) => {
                            var nama1 = doc.namaKateg
                            var nama2 = nama1.replace(/\s/g, "")
                            return (
                                <Container>
                                    <Row>
                                        <Col>
                                            <Button variant="default" onClick={() => filterSelection(nama2)} key={idx} className="kategoriBtn">{doc.namaKateg}</Button>
                                        </Col>
                                    </Row>
                                    <br />
                                </Container>
                            )
                        })}
                    </Row>
                </Col>
                <Col md={10}>
                    <input className="searchInput" placeholder="Masukkan judul program kepedulian" style={{ width: `80%` }}>
                    </input>
                    <a href="#"><img src={`images/program_donasi/searchBtn.png`} alt="" /></a>
                    <div className="container-fluid d-flex">
                        <div className="row">
                            {listProgram}
                        </div>
                    </div>
                </Col>
            </div>
        </div>
    )
}

export default ListProgram
