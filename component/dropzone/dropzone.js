import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import styled from 'styled-components'

const StyleDiv = styled.div `
  width: 96%;
  height: 20vh;
  text-align: center;
  line-height: 20vh;
  margin-left: auto;
  margin-right: auto;
  border: 2px dashed #ccc
`

function MyDropzone(props) {
  const onDrop = useCallback((acceptedFiles) => {
        props.onUploadFile(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <StyleDiv {...getRootProps()} directory="" webkitdirectory="">
      <input {...getInputProps()} accept="application/pdf"/>
      <p style={{cursor: 'pointer', fontSize:"20px"}}>Drag and Drop some files and folders here, or click to select</p>
    </StyleDiv>
  )
}

export default MyDropzone