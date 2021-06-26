import {
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap'
import Icon from "../../global/icon"

const SearchBar = () => {
    return (
        <Form className="w-100" inline>
            <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <Icon.SEARCH />
                    </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
            </InputGroup>
        </Form>
    )
}

export default SearchBar