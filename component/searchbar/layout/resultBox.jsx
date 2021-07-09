import { Spinner, ListGroup, ListGroupItem } from 'reactstrap'

const ResultBox = ({ resultList, loading, ...props }) => {

    return <ListGroup className={props.className}>
        {loading ?
            <ListGroupItem>
                <Spinner className="d-block mx-auto" color="info" />
            </ListGroupItem> :
            resultList.map((result) => {
                return <ListGroupItem tag="a" href="#">
                    {result}
                </ListGroupItem>
            })}
    </ListGroup>
}

export { ResultBox }