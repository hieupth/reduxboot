import { Button, Table, Input } from "reactstrap"
import Icon from "../../global/icon"
import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {Link} from 'react-router-dom'

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


const Templates = (props) => {
    const {documentList} = props
    const [documents, setDocuments] = useState([])

    useEffect(() => {
        setDocuments(documentList)
    },[documentList])

    const displayFolderFiles = (id) => {
        let temp = documents.map(document => {
            if (id === document.id) {
                document.isDisplayChild = !document.isDisplayChild
            }
            return {
                ...document, isDisplayChild: document.isDisplayChild
            }
        })
        setDocuments(temp)
    }

    const showFolders = (document) => {
        return (
            <>
            <tr key={document.id}>
                <td scope="row">
                    <Input 
                        type="checkbox" 
                        style={{ cursor: "pointer" }} 
                        checked={document.isChecked}
                        />
                </td>
                <td className="tb__name" 
                    style={{ cursor: "pointer" }}
                    onClick={() => displayFolderFiles(document.id)}
                    >
                        <Icon.FOLDER /> 
                        <span>{document.name} </span>
                </td>
                <td className="tb__detail">{document.owner}</td>
                <td 
                    style={statusColor(document.process, '%')}
                >{document.process}</td>
                <td 
                    style={statusColor(document.score, '/')}
                >{document.score}</td>
                <td className="tb__detail">{document.updated}</td>
            </tr>

                {document.isDisplayChild ? document.children.map((file) => {
                    return showFiles(file, '32px')
                }) : null}
            </>
        )
    }

    const showFiles = (document, paddingLeft) => {
        return (
            <tr key={document.id}>
                <td scope="row">
                    <Input 
                        type="checkbox" 
                        style={{ cursor: "pointer" }} 
                        checked={document.isChecked}
                        />
                </td>
                <td className="tb__name"  style={{ paddingLeft: paddingLeft }}>
                    <Icon.FILE />
                    <Link to="/pdf/1/1" target="_blank" onClick={() => console.log('files: ', document)}>{document.name}</Link>
                </td>
                <td className="tb__detail">{document.owner}</td>
                <td 
                    style={statusColor(document.process, '%')}
                >{document.process}</td>
                <td 
                    style={statusColor(document.score, '/')}
                >{document.score}</td>
                <td className="tb__detail">{document.updated}</td>
            </tr>
        )    
    }


    const showDocuments = (documents) => {
        return documents.map((document) => {
            if (document.icon === 'folder') {
                return showFolders(document)
            } else {
                return showFiles(document)
            }
    })
    }

    return <div className="document">
        <div className="document__container">
            <div className="action">
                <div className="float-left">
                    <label className="btn btn-success" style={{ cursor: "pointer" }}>
                        Upload
                        <input
                            type="file"
                            accept="application/pdf"
                            hidden multiple />
                    </label>

                    <Button color="danger" 
                        // disabled={documents.filter(document => document.isChecked !== true).length === documents.length}    
                    >Delete</Button>
                </div>
                <div className="float-right">
                    <Button color="primary" >Download</Button>
                </div>
            </div>
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>
                            <Input 
                                type="checkbox" 
                                style={{ cursor: "pointer" }} 
                                />
                        </th>
                        <th>Name</th>
                        <th>Owner</th>
                        <th>Process</th>
                        <th>Score</th>
                        <th>Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {showDocuments(documents)}
                </tbody>
            </Table>
        </div>
        <ToastContainer />
    </div>
}
export default Templates