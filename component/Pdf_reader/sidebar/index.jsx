import { Collapse, Nav, NavbarBrand, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import Profile from "../../profile";
import RectTree from "../../rectTree/rectTree";

import Icon from "../../../global/icon";
import logo_def from "../../../assets/image/logo.png";
import avatar_def from "../../../assets/image/avatar.svg";

import { useState, useEffect } from "react";

const navFuncItem = [
  {
    title: "Templates",
    to: "/templates",
    icon: <Icon.TEMPLATE />,
    exact: false,
  },
];

// const navOtherItem = [
//     {
//         title: "Toolbox",
//         to: '',
//         icon: <Icon.SETTING />,
//         exact: false,
//     }
// ]

const SidebarPdf = (props) => {
  const collapseOpen = props.collapse;
  const { className } = props;
  const { logo, title } = props;
  const { avatar, name, email } = props;

  // templates tree view
  const data = [
    { id: '01', name: 'Local Disk (C:)', expanded: false,
        subChild: [
            {
                id: '01-01', name: 'Program Files', expanded: false, parentID: '01',
                subChild: [
                    { id: '01-01-01', name: '7-Zip', expanded: false, parentID: '01-01', 
                      subChild: [
                        { id: '01-01-01-01', name: '7-Zip', expanded: false, parentID: '01-01', 
                        subChild: [
                          { id: '01-01-01-01', name: '7-Zip', expanded: false, parentID: '01-01', },
                          { id: '01-01-01-02', name: 'Git', expanded: false, parentID: '01-01' },
                          { id: '01-01-01-03', name: 'IIS Express', expanded: false, parentID: '01-01' },
                        ] },
                        { id: '01-01-01-02', name: 'Git', expanded: false, parentID: '01-01' },
                        { id: '01-01-01-03', name: 'IIS Express', expanded: false, parentID: '01-01' },
                      ]
                    },
                    { id: '01-01-02', name: 'Git', expanded: false, parentID: '01-01' },
                    { id: '01-01-03', name: 'IIS Express', expanded: false, parentID: '01-01' },
                ]
            },
            {
                id: '01-02', name: 'Users', expanded: false, parentID: '01',
                subChild: [
                    { id: '01-02-01', name: 'Smith', expanded: false, parentID: '01-02',},
                    { id: '01-02-02', name: 'Public', expanded: false, parentID: '01-02'},
                    { id: '01-02-03', name: 'Admin', expanded: false, parentID: '01-02'},
                ]
            },
            {
                id: '01-03', name: 'Windows', expanded: false, parentID: '01',
                subChild: [
                    { id: '01-03-01', name: 'Boot', expanded: false, parentID: '01-03' },
                    { id: '01-03-02', name: 'FileManager', expanded: false, parentID: '01-03' },
                    { id: '01-03-03', name: 'System32', expanded: false, parentID: '01-03' },
                ]
            },
        ]
    },
    {
        id: '02', name: 'Local Disk (D:)', expanded: false,
        subChild: [
            {
                id: '02-01', name: 'Personals', expanded: false, parentID: '02', 
                subChild: [
                    { id: '02-01-01', name: 'My photo.png', expanded: false, parentID: '02-01', },
                    { id: '02-01-02', name: 'Rental document.docx', expanded: false, parentID: '02-01', },
                    { id: '02-01-03', name: 'Pay slip.pdf', expanded: false, parentID: '02-01', },
                ]
            },
            {
                id: '02-02', name: 'Projects', expanded: false, parentID: '02', 
                subChild: [
                    { id: '02-02-01', name: 'ASP Application', expanded: false, parentID: '02-02', },
                    { id: '02-02-02', name: 'TypeScript Application', expanded: false, parentID: '02-02', },
                    { id: '02-02-03', name: 'React Application', expanded: false, parentID: '02-02', },
                ]
            },
            {
                id: '02-03', name: 'Office', expanded: false, parentID: '02', 
                subChild: [
                    { id: '02-03-01', name: 'Work details.docx', expanded: false, parentID: '02-03',  },
                    { id: '02-03-02', name: 'Weekly report.docx', expanded: false, parentID: '02-03',  },
                    { id: '02-03-03', name: 'Wish list.csv', expanded: false, parentID: '02-03',  },
                ]
            },
        ]
    },
    {
        id: '03', name: 'Local Disk (E:)', icon: 'folder', expanded: false, 
        subChild: [
            {
                id: '03-01', name: 'Pictures', expanded: false, parentID: '0031', 
                subChild: [
                    { id: '03-01-01', name: 'Wind.jpg', expanded: false, parentID: '03-01',  }, 
                    { id: '03-01-02', name: 'Stone.jpg', expanded: false, parentID: '03-01',  }, 
                    { id: '03-01-03', name: 'Home.jpg', expanded: false, parentID: '03-01',  }, 
                ]
            },
            {
                id: '03-02', name: 'Documents', expanded: false, parentID: '03', 
                subChild: [
                    { id: '03-02-01', name: 'Environment Pollution.docx', expanded: false, parentID: '03-02',  }, 
                    { id: '03-02-02', name: 'Global Warming.ppt', expanded: false, parentID: '03-02',  }, 
                    { id: '03-02-03', name: 'Social Network.pdf', expanded: false, parentID: '03-02',  }, 
                ]
            },
            {
                id: '03-03', name: 'Study Materials', expanded: false, parentID: '03', 
                subChild: [
                    { id: '03-03-01', name: 'UI-Guide.pdf', expanded: false, parentID: '03-03',  }, 
                    { id: '03-03-02', name: 'Tutorials.zip', expanded: false, parentID: '03-03',  }, 
                    { id: '03-03-03', name: 'TypeScript.7z', expanded: false, parentID: '03-03',  }, 
                ]
            },
        ]
    }
  ]
  const [boxs, setBoxs] = useState([]);

  const fields = {
    dataSource: boxs,
    id: "id",
    text: "name",
    child: "subChild",
    parentID: 'pid'
  }


  useEffect(() => {
    setBoxs(data)
  },[])

  const findIndex = (boxlist, id ,flag) => {
    var result = -1
    let parentId = id.slice(0, flag)
    if (parentId === id) parentId = null
    var j = - 1
    if (parentId) {
      for (var i = 0; i < boxlist.length; i++) {
        if (boxlist[i].id === parentId) j = i
      }
    }
    if (j !== -1) {
      return findIndex(boxlist[j].subChild, id, flag += 3)
    } else {
      boxlist.forEach((box, index) => {
        if (box.id === id) {
          result = index
        }
      })
    }
    return result
  }
  
  const setName = (boxlist, id, newName, flag) => {
    if (boxlist) {
      let parentId = id.slice(0, flag)
      boxlist.forEach((box) => {
        if (box.id === id) {
          box.name = newName
        } else if (box.id === parentId) {
          setName(box.subChild, id, newName, flag = flag + 3)
        }
      })
    }
  }

  const nameEdited = (newName, id) => {
    console.log("name edit")
    let flag = 2 // lấy vị trí để slice chuỗi id lấy id của cha
    setName(boxs, id, newName, flag)
  }

  const setExpand = (boxlist, id, expanded, flag) => {
    if (boxlist) {
      let parentId = id.slice(0, flag)
      boxlist.forEach((box) => {
        if (box.id === id) {
          box.expanded = expanded
        } else if (box.id === parentId) {
          setExpand(box.subChild, id, expanded, flag = flag + 3)
        }
      })
    }
  }

  const nodeIsExpanded = (nodeData) => {
    console.log("expand edit")
    let flag = 2 
    setExpand(boxs, nodeData.id, nodeData.expanded, flag)
  }

  const setNodePosition = (boxlist, draggedNodeData, droppedNodeData, dropIndex, dragIndex, flag, args) => {
    let parentIdDraggedNode = draggedNodeData.id.slice(0, flag) 
    let parentIdDroppedNode = droppedNodeData.id.slice(0, flag)
    if (parentIdDraggedNode === draggedNodeData.id) parentIdDraggedNode = draggedNodeData.id.slice(0, flag - 3) 
    if (parentIdDroppedNode === droppedNodeData.id) parentIdDroppedNode = droppedNodeData.id.slice(0, flag - 3) 
    console.log("parentIdDraggedNode", parentIdDraggedNode)
    console.log("parentIdDroppedNode", parentIdDroppedNode)
    console.log("dropIndex", dropIndex)
    console.log("dragIndex", dragIndex)
     if (draggedNodeData.id.length === droppedNodeData.id.length) {
      if (parentIdDraggedNode === parentIdDroppedNode) {
        for (let i = 0; i < boxlist.length; i++) {
          if (boxlist[i].id === parentIdDraggedNode) {
            return setNodePosition(boxlist[i].subChild, draggedNodeData, droppedNodeData, dropIndex, dragIndex, flag += 3)
          } 
          else if (boxlist[i].id === droppedNodeData.id) {
            let temp = boxlist[dragIndex]
            if (dropIndex < dragIndex) {
              for (let j = dragIndex; j > dropIndex ; j--) {
                boxlist[j] = boxlist[j - 1]
              }
            } else {
              for (let j = dragIndex; j < dropIndex; j++) {
                boxlist[j] = boxlist[j + 1]
              }
            }
            boxlist[dropIndex] = temp
            break;
          }
        }
      } else {
        let temp = null;
        boxlist.forEach((box) => {
          if (parentIdDraggedNode === box.id) {
            temp = box.subChild.splice(dragIndex, 1)
          }
        })
        boxlist.forEach((box) => {
          if (parentIdDroppedNode === box.id) {
            if (temp) {
              let node = temp[0]
              box.subChild.push(node)
              let newId = ""
              if (box.subChild.length < 10) {
                newId = `${parentIdDroppedNode}-0${box.subChild.length}`
              } else {
                newId = `${parentIdDroppedNode}-${box.subChild.length}`
              }
              for (let i = 0; i < box.subChild.length; i++) {
                if (newId === box.subChild.id) {
                  console.log("newId", newId)
                }
              }
              if (newId) {
                node.id = newId
                node.parentID = parentIdDroppedNode
                draggedNodeData.id = newId
                draggedNodeData.parentID = parentIdDroppedNode
              }
              const setNodeChildId = (subChild) => {
                subChild.forEach((child) => {
                  child.id = `${node.id}${child.id.slice(node.id.length)}`
                  child.parentID = node.id
                  if (child.subChild) {
                    setNodeChildId(child.subChild)
                  }
                })
              }
              if (node.subChild) {
                setNodeChildId(node.subChild)
              }
              for (let i = box.subChild.length - 1; i > dropIndex ; i--) {
                box.subChild[i] = box.subChild[i - 1]
              }
              box.subChild[dropIndex] = node
              console.log("draggedNodeData", draggedNodeData)
              console.log("args", args)
            }
          }
        })  
      }
    } 
    else if (draggedNodeData.id.length > droppedNodeData.id.length) {

    } 
    else {

    }
   }

  const nodeDragStop = (droppedNodeData, draggedNodeData, position, dropIndex, args) => {
    console.log("draggedNodeData", draggedNodeData)
    console.log("droppedNodeData", droppedNodeData)
    console.log("position", position)
    if (droppedNodeData && draggedNodeData) {
      let flag = 2 
      const dragIndex = findIndex(boxs, draggedNodeData.id, flag)
      if (position === "Before" || position === "After") {
        try {
          setNodePosition(boxs, draggedNodeData, droppedNodeData, dropIndex, dragIndex, flag, args)
          console.log("boxs: ", boxs)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }

  const deleteNodeData = (boxlist, id, flag) => {
    if (boxlist) {
      let parentId = id.slice(0, flag)
      boxlist.forEach((box, index) => {
        if (box.id === id) {
          boxlist.splice(index, 1)
        } else if (box.id === parentId) {
          setExpand(box.subChild, id, flag = flag + 3)
        }
      })
    }
  }

  const nodeDelete = (id) => {
    if (id) {
      let flag = 2
      try {
        window.onkeydown = (event) => {
          if (event.metaKey && event.key === 'Backspace') {
            deleteNodeData(boxs, id, flag)
            console.log('boxs', boxs)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  const addRect = () => {
    props.addRect();
    let temp = [...boxs]
    temp.push({
      id: "04",
      name: "default 1",
      expanded: false,
      subChild: [],
    },)
    setBoxs(temp)
  };

  const deleteRect = () => {
    props.deleteRect();
  }

  return (
    <Collapse className={className} isOpen={collapseOpen}>
      <div className="sidebar__sticky h-100">
        <Nav className="px-2" vertical>
          <NavbarBrand className="d-none d-md-block" href="/">
            <img src={logo ?? logo_def} />
            <span className="sidebar__title">{title ?? "CEREBRO ORC"}</span>
          </NavbarBrand>
          <Profile
            className="d-none d-md-flex"
            avatar={avatar ?? avatar_def}
            name={name ?? "Your name"}
            email={email ?? "Your email"}
          />
          {navFuncItem.map(({ title, to, icon, exact }, idx) => {
            return (
              <NavItem key={idx}>
                <NavLink
                  to={to}
                  exact={exact}
                  className="sidebar__link"
                  activeClassName="sidebar__link--active"
                >
                  {icon}
                  <span>{title}</span>
                </NavLink>
              </NavItem>
            );
          })}
          <hr />
          <div className="sidebar__tool-box position-relative">
            <Icon.SETTING />
            <span>Toolbox</span>
            <div className="tool position-absolute">
              <div className="tool__item" onClick={addRect}>
                ADD RECT
              </div>
              <div className="tool__item" onClick={deleteRect}>
                DEL RECT
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <hr />
          <div className="sidebar__templates">
            <Icon.SETTING />
            <span>Templates</span>
            <RectTree 
              fields={fields}
              nameEdited={nameEdited}
              nodeDragStop={nodeDragStop}
              nodeIsExpanded={nodeIsExpanded}
              nodeDelete={nodeDelete}
              />
          </div>
          {/* {navOtherItem.map(({ title, to, icon, exact }, idx) => {
                        return <NavItem key={idx}>
                            <NavLink
                                to={to}
                                exact={exact}
                                className="sidebar__link"
                                activeClassName="sidebar__link--active">
                                {icon}
                                <span>{title}</span>
                            </NavLink>
                        </NavItem>
                    })} */}
        </Nav>
      </div>
    </Collapse>
  );
};
export default SidebarPdf;
