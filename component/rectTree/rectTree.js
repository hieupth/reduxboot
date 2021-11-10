import { TreeViewComponent } from "@syncfusion/ej2-react-navigations";


function RectTree(props) {
    const {fields} = props;

    const nameEdited = (args) => {
        props.nameEdited(args.newText, args.nodeData.id);
    }
    
    const nodeDragStop = (args) => {
        console.log(args)
        props.nodeDragStop(args.droppedNodeData, args.draggedNodeData, args.position, args.dropIndex, args)
    }

    const nodeIsExpanded = (args) => {
        props.nodeIsExpanded(args.nodeData)
    }

    const nodeSelected = (args) => {
        props.nodeDelete(args.nodeData.id)
    }

    return (
        <TreeViewComponent
              fields={fields}
              allowEditing={true}
              allowDragAndDrop={true}
              expandOn={"None"}
            //   allowMultiSelection={true}
              nodeEdited={(args) => nameEdited(args)}
              nodeDragStop={(args) => nodeDragStop(args)}
              nodeExpanded={(args) => nodeIsExpanded(args)}
              nodeCollapsed={(args) => nodeIsExpanded(args)}
              nodeSelected={(args) => nodeSelected(args)}
            />
    )
}

export default RectTree;