import { Container, Row, Col } from "reactstrap"
import { Route, Switch } from 'react-router-dom';
import Sidebar from "component/sidebar"
import Header from "component/Header"
import Body from "component/body"
import 'bootheme/dashboard.scss'
import { useState } from "react";
import 'bootheme/content.scss'
import { useMediaQuery } from "react-responsive";

const Dashboard = props => {
    const isBigScreen = useMediaQuery({
        query: '(min-width: 768px)'
    })

    const [collapseOpen, setCollapseOpen] = useState(true)
    const toggleCollapse = () => setCollapseOpen(collapse => !collapse)
    return (
        <>
            <Container className="wrapper" fluid>
                <Row>
                    <Col md={3} xl={2} />
                    <Col md={9} xl={10} className="page__content px-0 h-100 ">
                        <Header toggle={toggleCollapse} />
                    </Col>
                </Row>
                <Row className="h-100">
                    <Col md={3} xl={2} className="page__sidebar px-0 ">
                        <Sidebar collapse={isBigScreen ? collapseOpen : !collapseOpen} />
                    </Col>
                    <Col md={9} xl={10} className="page__content px-0 h-100 ">
                        <Switch>
                            <Route path='/documents' exact>
                                <Body />
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Dashboard