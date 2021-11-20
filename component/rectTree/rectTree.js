import {
  TreeViewComponent,
  ContextMenuComponent,
} from "@syncfusion/ej2-react-navigations";
import { DataManager, Query, Predicate } from "@syncfusion/ej2-data";
import { MaskedTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { useState, useEffect } from "react";

function RectTree(props) {
  const { boxs } = props;

  var treeObj, menuObj, maskObj;

  const fields = {
    dataSource: boxs,
    id: "id",
    parentID: "pid",
    text: "name",
    hasChildren: "hasChild",
    expanded: "expanded",
  };

  const menuItems = [{ text: "Rename Item" }, { text: "Remove Item" }];
  const [open, setOpen] = useState(false);

  const changeDataSource = (data) => {
    treeObj.fields = {
      dataSource: data,
      id: "id",
      text: "name",
      parentID: "pid",
      hasChildren: "hasChild",
    };
  };

  //Filtering the TreeNodes
  const searchNodes = (args) => {
    let _text = args.value;
    let predicats = [],
      _array = [],
      _filter = [];
    if (_text == "") {
      changeDataSource(boxs);
    } else {
      let predicate = new Predicate("name", "startswith", _text, true);
      let filteredList = new DataManager(boxs).executeLocal(
        new Query().where(predicate)
      );
      for (let j = 0; j < filteredList.length; j++) {
        _filter.push(filteredList[j]["id"]);
        let filters = getFilterItems(filteredList[j], boxs);
        for (let i = 0; i < filters.length; i++) {
          if (_array.indexOf(filters[i]) == -1 && filters[i] != null) {
            _array.push(filters[i]);
            predicats.push(new Predicate("id", "equal", filters[i], false));
          }
        }
      }
      if (predicats.length == 0) {
        changeDataSource([]);
      } else {
        let query = new Query().where(Predicate.or(predicats));
        let newList = new DataManager(boxs).executeLocal(query);
        changeDataSource(newList);
        let proxy = treeObj;
        setTimeout(function () {
          proxy.expandAll();
        }, 100);
      }
    }
  };

  //Find the Parent Nodes for corresponding childs
  const getFilterItems = (fList, list) => {
    let nodes = [];
    nodes.push(fList["id"]);
    let query2 = new Query().where("id", "equal", fList["pid"], false);
    let fList1 = new DataManager(list).executeLocal(query2);
    if (fList1.length != 0) {
      let pNode = getFilterItems(fList1[0], list);
      for (let i = 0; i < pNode.length; i++) {
        if (nodes.indexOf(pNode[i]) == -1 && pNode[i] != null)
          nodes.push(pNode[i]);
      }
      return nodes;
    }
    return nodes;
  };

  const dataSourceChanged = (args) => {
    console.log("args", args.data);
    props.dataSourceChanged(args.data);
  };

  const nodeExpanded = (args) => {
    props.setExpanded(args.nodeData)
  }
  // chọn nốt rồi click chuột phải sẽ mở context menu
  const nodeclicked = (args) => {
    setOpen(true);
    if (args.event.which === 3) {
      treeObj.selectedNodes = [args.node.getAttribute("data-uid")];
    }
  };

  const nodeSelected = (args) => {
    let targetNodeId = treeObj.selectedNodes[0];
    let node = treeObj.getTreeData(targetNodeId)[0];
    console.log(node);
    props.addRectInfo(node)
  };
  // chọn item trong contextmenu
  const menuclick = (args) => {
    let targetNodeId = treeObj.selectedNodes[0];
    try {
      if (args.item.text == "Remove Item") {
        treeObj.removeNodes([targetNodeId]);
        props.deleteRect(Number(targetNodeId));
      } else if (args.item.text == "Rename Item") {
        treeObj.beginEdit(targetNodeId);
      }
    } catch (e) {
      console.error(e);
    }
  };
  // Truớc khi mở context menu
  const beforeopen = (args) => {
    let targetNodeId = treeObj.selectedNodes[0];

    let targetNode = document.querySelector(
      '[data-uid="' + targetNodeId + '"]'
    );
    if (targetNode.classList.contains("remove")) {
      menuObj.enableItems(["Remove Item"], false);
    } else {
      menuObj.enableItems(["Remove Item"], true);
    }
    if (targetNode.classList.contains("rename")) {
      menuObj.enableItems(["Rename Item"], false);
    } else {
      menuObj.enableItems(["Rename Item"], true);
    }
  };

  useEffect(() => {
    changeDataSource(boxs);
  }, [boxs]);

  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="control_wrapper">
          <MaskedTextBoxComponent
            ref={(mask) => {
              maskObj = mask;
            }}
            change={searchNodes}
          />
          <div id="tree">
            <TreeViewComponent
              fields={fields}
              allowDragAndDrop={true}
              allowEditing={true}
              expandOn={"None"}
              dataSourceChanged={dataSourceChanged}
              ref={(treeview) => {
                treeObj = treeview;
              }}
              nodeClicked={nodeclicked}
              nodeSelected={nodeSelected}
              nodeExpanded={nodeExpanded}
              nodeCollapsed={nodeExpanded}
            />
            {open && (
              <ContextMenuComponent
                id="contentmenutree"
                target="#tree"
                items={menuItems}
                beforeOpen={beforeopen}
                select={menuclick}
                ref={(contextmenu) => {
                  menuObj = contextmenu;
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RectTree;
