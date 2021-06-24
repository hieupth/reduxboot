import { Button, Table, Input } from "reactstrap"
import Icon from "global/icon"
import 'bootheme/document.scss'

const mockupData = [
    {
        Icon: <Icon.FOLDER />,
        Name: "document-abc-xyz",
        Owner: "hieupt.ai@gmail.com",
        Process: "50%",
        Score: "45/100",
        Updated: "5 Minutes ago"
    },
    {
        Icon: <Icon.FILE />,
        Name: "certification",
        Owner: "hieupt.ai@gmail.com",
        Process: "100%",
        Score: "85/100",
        Updated: "15 Minutes ago"
    },
]

const statusColor = (scoreStr, spliter) => {
    let score = parseFloat(scoreStr.split(spliter)[0])
    if (score < 50) {
        return { color: "red" }
    }
    if (score < 70) {
        return { color: "darkorange" }
    }
    return { color: "green" }
}

const Body = () => {
    return <div className="document">
        <div className="document__container">
            <div className="action">
                <div className="float-left">
                    <Button color="success">Upload</Button>
                    <Button color="danger">Delete</Button>
                </div>
                <div className="float-right">
                    <Button color="primary">Download</Button>
                </div>
            </div>
            <Table responsive hover>
                <thead>
                    <tr>
                        <th><Input type="checkbox" /></th>
                        <th>Name</th>
                        <th>Owner</th>
                        <th>Process</th>
                        <th>Score</th>
                        <th>Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {mockupData.map(({ Icon, Name, Owner, Process, Score, Updated }) => {
                        return <tr>
                            <td scope="row">
                                <Input type="checkbox" />
                            </td>
                            <td className="tb__name">
                                {Icon}
                                <span>{Name}</span>
                            </td>
                            <td className="tb__detail">{Owner}</td>
                            <td style={statusColor(Process, '%')}>{Process}</td>
                            <td style={statusColor(Score, '/')}>{Score}</td>
                            <td className="tb__detail">{Updated}</td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </div>
    </div>
}
export default Body