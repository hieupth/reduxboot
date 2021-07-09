import axios from 'axios'
import { useState } from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap'
import Icon from "../../../global/icon"
import { ResultBox } from './resultBox'
import MockApi from 'reduxboot/api'

const SearchBar_layout = (props) => {
    const { url } = props
    if (!url) throw Error("Undefined url props")

    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)

    // Input focus state
    const [onFocus, setFocus] = useState(false)

    // Handle input 
    const inputHandler = async (e) => {
        setLoading(true)
        try {
            // const res = await axios.get(url, { params: { search: e.currentTarget.value } })
            const res = await MockApi.getMe();
            if (res) {
                console.log(res)
                setResult(res.data)
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <>
            <Form className="position-relative w-100" inline>
                <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <Icon.SEARCH />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        style={{ boxShadow: "none" }}
                        placeholder="Search"
                        type="text"
                        onChange={inputHandler}
                        onFocus={() => { setFocus(true) }}
                        onBlur={() => { setFocus(false) }}
                    />
                </InputGroup>
                {onFocus ?
                    <>
                        <div
                            className="modal-backdrop fade show"
                            style={{ zIndex: "0", top: "auto" }} />
                        <ResultBox
                            className="position-absolute pl-md-6 py-1 w-100"
                            resultList={result}
                            loading={loading}
                        />
                    </> : <></>}
            </Form>
        </>
    )
}

SearchBar_layout.propTypes = {
    url: PropTypes.string.isRequired,
    setter: PropTypes.func,
}

export default SearchBar_layout