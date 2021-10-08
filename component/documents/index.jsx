import { Button, Table, Input } from "reactstrap"
import Icon from "../../global/icon"
import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// const mockupData = [
//     {
//         Icon: <Icon.FOLDER />,
//         Name: "document-abc-xyz",
//         Owner: "hieupt.ai@gmail.com",
//         Process: "50%",
//         Score: "45/100",
//         Updated: "5 Minutes ago",
//         Id: 1,
//         isChecked: false
//     },
//     {
//         Icon: <Icon.FILE />,
//         Name: "certification",
//         Owner: "hieupt.ai@gmail.com",
//         Process: "100%",
//         Score: "85/100",
//         Updated: "15 Minutes ago",
//         Id: 2,
//         isChecked: false
//     },
// ]

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


const Documents = (props) => {
    const {documentList} = props
    const [isCheckedAll, setIsCheckedAll] = useState(false)
    const [documents, setDocuments] = useState([])

    useEffect(() => {
        setDocuments(documentList)
    },[documentList])

    const onUploadFile = (files) => {
            props.onUploadFile(files)
    }
    
    const onChecked = (id) => {
        let temp = documents.map(document => {
            if (document.children) {
                document.children.forEach(file => {
                    if (id === file.id) {
                        file.isChecked = !file.isChecked
                    }
                })
            }
            if (id === document.id) {
                document.isChecked = !document.isChecked
            }
            return {
                ...document, isChecked: document.isChecked
            }
        })
        setDocuments(temp)
        renderCheckedAll(documents)
    }
    
    const onCheckedAll = () => {
        setIsCheckedAll(!isCheckedAll)
        documents.forEach((document) => {
            document.isChecked = !isCheckedAll
        })
        
    }

    const renderCheckedAll = (documents) => {
        let checkedInput = documents.filter(document => document.isChecked === true)
        checkedInput.length === documents.length ? setIsCheckedAll(true) : setIsCheckedAll(false);
    }

    const onDelete = () => { 
        documents.map(document => {
            if (document.children) {
                document.children.forEach(file => {
                    if (file.isChecked) {
                        props.onDelete(document.id,file.id);
                    }
                })
            }
            if (document.isChecked) {
                props.onDelete(document.id, null);
            }
        })
    }

    const handleDownload = (file) => { 
        if (file) {
            props.handleDownload(file)
        } else {
            documents.map(document => {
                if (document.isChecked) {
                    props.handleDownload(document.file);
                }
            })
        }
    }

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
                        onChange={() => onChecked(document.id)}
                        checked={document.isChecked}
                        />
                </td>
                <td className="tb__name" 
                    style={{ cursor: "pointer" }}
                    onClick={() => displayFolderFiles(document.id)}>
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
                        onChange={() => onChecked(document.id)}
                        checked={document.isChecked}
                        />
                </td>
                <td className="tb__name" onClick={() => handleDownload(document.file)} style={{ paddingLeft: paddingLeft, cursor:"pointer" }}>
                    <Icon.FILE />
                    <span>{document.name}</span>
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
                            onChange={(e) => onUploadFile(e.target.files)}
                            hidden multiple />
                    </label>

                    <Button color="danger" 
                        onClick={onDelete}
                        disabled={documents.filter(document => document.isChecked !== true).length === documents.length}    
                    >Delete</Button>
                </div>
                <div className="float-right">
                    <Button color="primary" onClick={() => handleDownload()}>Download</Button>
                </div>
            </div>
            <Table responsive hover>
                <thead>
                    <tr>
                        <th>
                            <Input 
                                type="checkbox" 
                                style={{ cursor: "pointer" }} 
                                onChange={onCheckedAll}  
                                checked={isCheckedAll}
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
export default Documents