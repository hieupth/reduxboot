import { Collapse, Nav, NavbarBrand, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import Profile from "../../profile";
import RectTree from "../../rectTree/rectTree";

import Icon from "../../../global/icon";
import logo_def from "../../../assets/image/logo.png";
import avatar_def from "../../../assets/image/avatar.svg";

import { useState, useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "../../../../app/store";
import {
  fetchData,
  postBox,
  delBox,
  delChildBox,
  setNameBox,
  setExpandBox,
  setDragBox,
  setDropBox,
} from "features/boxlist/boxlistSlice";

const navFuncItem = [
  {
    title: "Templates",
    to: "/templates",
    icon: <Icon.TEMPLATE />,
    exact: false,
  },
];

const SidebarPdf = (props) => {
  const collapseOpen = props.collapse;
  const { className } = props;
  const { logo, title } = props;
  const { avatar, name, email } = props;
  const {rect, selectedBoxId} = props
  // const ditpatch = useAppDispatch();
  // const { data } = useTypedSelector((state) => state.boxlistSlice);

   // list data source for TreeView component
   const data = [
    { id: 1, name: "Australia", hasChild: true },
    { id: 2, pid: 1, name: "New South Wales" },
    { id: 3, pid: 1, name: "Victoria" },
    { id: 4, pid: 1, name: "South Australia" },
    { id: 6, pid: 1, name: "Western Australia" },
    { id: 7, name: "Brazil", hasChild: true },
    { id: 8, pid: 7, name: "Paraná" },
    { id: 9, pid: 7, name: "Ceará" },
    { id: 10, pid: 7, name: "Acre" },
    { id: 11, name: "China", hasChild: true },
    { id: 12, pid: 11, name: "Guangzhou" },
    { id: 13, pid: 11, name: "Shanghai" },
    { id: 14, pid: 11, name: "Beijing" },
    { id: 15, pid: 11, name: "Shantou" },
    { id: 16, name: "France", hasChild: true },
    { id: 17, pid: 16, name: "Pays de la Loire" },
    { id: 18, pid: 16, name: "Aquitaine" },
    { id: 19, pid: 16, name: "Brittany" },
    { id: 20, pid: 16, name: "Lorraine" },
    { id: 21, name: "India", hasChild: true },
    { id: 22, pid: 21, name: "Assam" },
    { id: 23, pid: 21, name: "Bihar" },
    { id: 24, pid: 21, name: "Tamil Nadu" },
    { id: 25, pid: 21, name: "Punjab" }
];
  const [boxs, setBoxs] = useState([])
 
  // useEffect(() => {
  //   const fetchDocuments = async () => {
  //     try {
  //       ditpatch(fetchData());
  //     } catch (err) {
  //       console.log("Error: ", err);
  //     }
  //   };
  //   fetchDocuments();
  // }, []);

  // templates tree view

  // định dang fields của treeview
  const dataSourceChanged = (updatedData) => {
    console.log("updatedata: ", updatedData)
    setBoxs(updatedData)
  }

  const setExpanded = (node) => {
    let temp = [...boxs]
    temp.forEach((box) => {
      if (box.id == node.id) {
        box.expanded = node.expanded
      }
    })
    setBoxs(temp)
  }
  // set id cho new box
  
  const findAllId = (boxs) => {
    let allId
    allId = boxs.reduce((result, box) => {
      result.push(box.id)
      if (box.subChild) {
        const temp = findAllId(box.subChild)
        result.push(...temp)
      }
      return result
    },[])
    return allId
  }

  const setBoxId = (boxs) => {
    let id
    const allId = findAllId(boxs)
    console.log(allId);
    let tempid = 0;
    do {
      id = tempid + 1
      tempid++
    } while (allId.some((boxid) => boxid === id));
    return id
  }

  const findAllName = (boxs) => {
    let allName
    allName = boxs.reduce((result, box) => {
      result.push(box.name)
      if (box.subChild) {
        const temp = findAllName(box.subChild)
        result.push(...temp)
      }
      return result
    },[])
    return allName
  }
  // set name cho new box
  const setBoxName = (boxs) => {
    // set name cho box
    const allName = findAllName(boxs)
    console.log(allName)
    let tempNumberName = 0;
    let name
    do {
      name = `default ${tempNumberName + 1}`;
      tempNumberName++;
    } while (allName.some((boxname) => boxname === name))
    return name;
  }
  // thêm box
  const addRect = async () => {
    const id = setBoxId(boxs);
    const name = setBoxName(boxs);
    console.log("rect", rect)
    if (boxs.length >= 99) {
      console.log("Đã tối đa.");
    } else {
      // ditpatch(postBox(temp));
      props.addRect(id)
      let rectInfo = await rect[rect.length - 1]
      let temp = {
        id: id,
        name: name,
        subChild: [],
        rectInfo: rectInfo,
        expanded: false
      }
      let tempBox = [...boxs];
      tempBox.push(temp)
      setBoxs(tempBox)
    }
  }

  const deleteRectChild = (id) => {
    boxs.forEach((box) => {
      if (box.pid === id) {
        props.deleteRect(box.id)
        return deleteRectChild(box.id)
      }
    })
  }

  const deleteRect = (id) => {
    deleteRectChild(id)
    props.deleteRect(id)
  }

  const updateRectInfo = (boxs) => {
    boxs.forEach((box) => {
      for (let j = 0; j < rect.length; j++) {
        if (box.id === rect[j].id) {
          box.rectInfo = rect[j]
          break
        }
      }
    })
  }

  const addRectInfo = (node) => {
    props.addRectInfo(node.rectInfo)
  }

  useEffect(() => {
    let temp = [...boxs]
    updateRectInfo(temp)
    console.log("temp: ", temp)
    setBoxs(temp)
  },[rect])

  useEffect(() => {
    let temp = [...boxs]
    temp.forEach((box) => {
      if (box.id === selectedBoxId) {
        box.selected = true
      } else {
        box.selected = false
      }
    })
    setBoxs(temp)
  }, [selectedBoxId])

  // useEffect(() => {
  //   console.log("data change");
  //   let boxlist = JSON.parse(JSON.stringify(data));
  //   console.log("boxlist", boxlist);
  //   setBoxs(boxlist);
  // }, [data]);

  useEffect(() => {
    console.log("boxs changed: ",boxs)
    setBoxs(boxs)
  },[boxs])

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
              boxs={boxs}
              // nameEdited={nameEdited}
              // nodeDragStop={nodeDragStop}
              // nodeIsExpanded={nodeIsExpanded}
              // nodeDelete={nodeDelete}
              dataSourceChanged={dataSourceChanged}
              deleteRect={deleteRect}
              addRectInfo={addRectInfo}
              setExpanded={setExpanded}
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
