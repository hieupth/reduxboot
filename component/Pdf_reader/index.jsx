import { useCallback, useEffect, useState } from 'react';
import { Document, Page } from "react-pdf";
import { Button } from 'reactstrap';
import { RectDraw } from '../rect_draw/rectState';

import samplePDF from './sample.pdf';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}


const Pdf_reader = () => {
    // Get webpage size
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

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
            x: 0,
            y: 0
        })
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
            <Document
                className="d-flex flex-column align-items-center"
                file={samplePDF}
                options={{ workerSrc: "/pdf.worker.js" }}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <div>
                    <Button
                        color="primary"
                        onClick={addRect}>
                        Draw
                    </Button>
                    <Button
                        color="success">
                        Download
                    </Button>
                </div>

                <Page
                    height={windowDimensions.height * 80 / 100}
                    pageNumber={pageNumber}
                    onLoadSuccess={onPageLoadSuccess}>
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
                    <Button
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}
                    >
                        Next
                    </Button>
                </div>
            </Document>
        </>
    );
}
export { Pdf_reader }