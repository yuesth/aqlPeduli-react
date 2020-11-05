import React from "react"
import Layout from "../layout"
import { Container, Row, Col } from "react-bootstrap"
import ListProgram from "./list-program"

function LayoutProgram() {
    return (
        <Layout>
            <Container>
                <Row>
                    <Col style={{ textAlign: `center` }}>
                        <h1>Program Kepedulian</h1>
                    </Col>
                </Row>
            </Container>
            <br />                
            <ListProgram />
        </Layout>
    )
}

export default LayoutProgram