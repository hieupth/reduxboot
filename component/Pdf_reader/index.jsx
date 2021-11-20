import { useCallback, useEffect, useState } from 'react';
import { Document, Page } from "react-pdf";
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useMediaQuery } from "react-responsive";
import { RectDraw } from '../rect_draw/rectState';
import {
    Row,
    Col,
} from 'reactstrap'
import samplePDF from './sample.pdf';
import SibarPdf from 'reduxboot/component/Pdf_reader/sidebar/index'

import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}


const PdfReader = () => {
    // Get webpage size
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [collapseOpen, setCollapseOpen] = useState(null)
    const toggleCollapse = () => setCollapseOpen(collapse => !collapse)

    const isBigScreen = useMediaQuery({
        query: '(min-width: 768px)'
    })

    useEffect(() => {
        if (isBigScreen) {
            setCollapseOpen(true)
        } else {
            setCollapseOpen(false)
        }
    }, [isBigScreen])

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // PDF document hooks
    const [rectList, setRectList] = useState([[]])
    const [rectInfo, setRectInfo] = useState()
    const [selected, setSelected] = useState()

    const addRect = (id) => {
        let temp = [...rectList]
        temp[pageNumber - 1].push({
            id: id,
            width: 100,
            height: 100,
            x: 50,
            y: 50
        })
        setRectList(temp)
    }

    const deleteRect = (id) => {
        let temp = [...rectList]
        let index
        for (let i = 0; i < temp[pageNumber - 1].length; i++) {
            if (temp[pageNumber - 1][i].id === id) {
                index = i
                break
            }
        }
        temp[pageNumber - 1].splice(index, 1)
        setRectList(temp)
        setRectInfo()

    }

    const setRect = (r) => {
        let temp = [...rectList]
        temp[pageNumber - 1] = r
        setRectList(temp)
    }

    const addRectInfo = (rInfo) => {
        setRectInfo(rInfo)
    }

    const updateRectInfo = (rectList) => {
        if (rectInfo) {
            rectList.forEach((rect) => {
                if (rect.id === rectInfo.id) {
                    return setRectInfo(rect)
                }
            })
        }
    }

    const [pageSize, setPageSize] = useState({})
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

    function onDocumentLoadSuccess({ numPages }) {
        setRectList([...Array(numPages)].map(() => Array()))
        setNumPages(numPages);
        setPageNumber(1);
    }

    function onPageLoadSuccess({ width, height }) {
        setPageSize({
            width,
            height
        })
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    const showRectInfo = (rectInfo) => {
        return (
            <div className="information_wrap d-flex justify-content-around">
                <div>
                    <div className="information_item">Position-X: {rectInfo.x}</div>
                    <div className="information_item">Position-Y: {rectInfo.y}</div>
                </div>
                <div>
                    <div className="information_item">Width: {rectInfo.width}px</div>
                    <div className="information_item">Height: {rectInfo.height}px</div>
                </div>
            </div>
        )
    }

    const setSelect = (id) => {
        setSelected(id)
    }

    return (
        <>
        <SibarPdf
        className="page__sidebar w-md-100"
        collapse={collapseOpen}
        name={"Pham Trung Hieu"}
        email={"hieupt.ai@gmail.com"}
        rect={rectList[pageNumber - 1]}
        addRect={addRect}
        deleteRect={deleteRect}
        addRectInfo={addRectInfo}
        selectedBoxId={selected}
        />
        <Row className="w-100 mt-4 ms-1">
            <Col md={9} xl={9}>
                <Document
                    className="d-flex flex-column align-items-center"
                    file={samplePDF}
                    // options={{ workerSrc: "/pdf.worker.js" }}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    {/* <div>
                        <Button
                            color="danger"
                            onClick={addRect}>
                            Draw
                        </Button>
                        <Button
                            color="danger"
                            onClick={deleteRect}>
                            Delete
                        </Button>
                        <Button
                            color="success">
                            Download
                        </Button>
                    </div> */}

                    <Page
                        height={windowDimensions.height * 80 / 100}
                        pageNumber={pageNumber}
                        onLoadSuccess={onPageLoadSuccess}
                        >
                        <RectDraw
                            rect={rectList[pageNumber - 1]}
                            setRect={setRect}
                            maxWidth={pageSize.width}
                            maxHeight={pageSize.height} 
                            updateRectInfo={updateRectInfo}
                            addRectInfo={addRectInfo}
                            setSelect={setSelect}
                            />
                    </Page>
                    <div>
                        <p style={{ textAlign: 'center' }}>
                            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                        </p>
                        <Button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
                            Previous
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button
                            type="button"
                            disabled={pageNumber >= numPages}
                            onClick={nextPage}
                        >
                            Next
                        </Button>
                    </div>
                </Document>
             </Col>
             <Col md={3} xl={3} className="pdf-reader_information-canvas">
                {rectInfo && showRectInfo(rectInfo)}
                {rectInfo && (
                    <div className="d-flex justify-content-center p-5">
                        <div className="dropdown">
                            <button className="btn btn-primary dropdown-toggle " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown button
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><span className="dropdown-item">Text</span></li>
                                <li><span className="dropdown-item">Key - Value</span></li>
                                <li><span className="dropdown-item">Checkbox</span></li>
                            </ul>
                        </div>
                    </div>
                )}
             </Col>
                {/* <div className="position-relative right-0 top-0" style={{backgroundColor: 'red', width: '400px', height: '400px'}}></div> */}
        </Row>
        </>
    );
}
export default PdfReader 