import { useCallback, useEffect, useState } from 'react';
import { Document, Page } from "react-pdf";
import { Button } from 'reactstrap';
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
    const addRect = () => {
        let temp = [...rectList]
        temp[pageNumber - 1].push({
            width: 100,
            height: 100,
            x: 50,
            y: 50
        })
        setRectList(temp)
    }

    console.log('rectList: ', rectList)

    const deleteRect = () => {
        let temp = [...rectList]
        temp[pageNumber - 1].pop()
        setRectList(temp)
    }

    const setRect = (r) => {
        let temp = [...rectList]
        temp[pageNumber - 1] = r
        setRectList(temp)
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

    return (
        <>
        <SibarPdf
        className="page__sidebar w-md-100"
        collapse={collapseOpen}
        name={"Pham Trung Hieu"}
        email={"hieupt.ai@gmail.com"}
        addRect={addRect}
        deleteRect={deleteRect}
        />
        <Row className="w-100 mt-4 ms-1">
            <Col md={9} xl={9}>
                <Document
                    className="d-flex flex-column align-items-center"
                    file={samplePDF}
                    // options={{ workerSrc: "/pdf.worker.js" }}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <div>
                        {/* <Button
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
                        </Button> */}
                    </div>

                    <Page
                        height={windowDimensions.height * 80 / 100}
                        pageNumber={pageNumber}
                        onLoadSuccess={onPageLoadSuccess}
                        >
                        <RectDraw
                            rect={rectList[pageNumber - 1]}
                            setRect={setRect}
                            maxWidth={pageSize.width}
                            maxHeight={pageSize.height} />
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
                 {rectList[pageNumber - 1].map((rect, index) => {
                    return (
                        <div className="information_wrap d-flex justify-content-around" key={index}>
                            <div>
                                <div className="information_item">Position-X: {rect.x}</div>
                                <div className="information_item">Position-Y: {rect.y}</div>
                            </div>
                            <div>
                                <div className="information_item">Width: {rect.width}px</div>
                                <div className="information_item">Height: {rect.height}px</div>
                            </div>
                        </div>
                    )
                 })}
             </Col>
                {/* <div className="position-relative right-0 top-0" style={{backgroundColor: 'red', width: '400px', height: '400px'}}></div> */}
        </Row>
        </>
    );
}
export default PdfReader 