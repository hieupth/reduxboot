import {
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Navbar,
    NavbarToggler
} from 'reactstrap'
import Icon from "global/icon"
import 'bootheme/header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faI from '@fortawesome/free-solid-svg-icons'

const Header = props => {
    const toggleCollapse = props.toggle
    return (
        <Navbar
            className="py-0"
            // sticky="top"
            expand="md">
            <div className="header d-flex flex-grow-1">
                <NavbarToggler onClick={toggleCollapse}>
                    <FontAwesomeIcon icon={faI.faBars} />
                </NavbarToggler>
                <Form className="w-100" inline>
                    <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Icon.SEARCH />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Search" type="text" />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <Icon.BELL />
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </Form>
            </div>
        </Navbar>
    )
}
export default Header