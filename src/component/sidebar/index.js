import { Collapse, Nav, NavbarBrand, NavItem } from "reactstrap"
import { NavLink } from 'react-router-dom'
import Icon from "global/icon"
import Profile from "./profile"
import logo from "assets/logo.png"
import avatar from "assets/avatar.svg"
import 'bootheme/sidebar.scss'

const navFuncItem = [
    {
        title: "Documents",
        to: '/documents',
        icon: <Icon.DOCUMENT />,
        exact: true,
    },
    {
        title: "Templates",
        to: '/templates',
        icon: <Icon.TEMPLATE />,
        exact: false,
    }, {
        title: "Tasks",
        to: '/tasks',
        icon: <Icon.TASK />,
        exact: false,
    }]
const navOtherItem = [
    {
        title: "Settings",
        to: '/settings',
        icon: <Icon.SETTING />,
        exact: false,
    }, {
        title: "Logout",
        to: '/logout',
        icon: <Icon.CONTACT />,
        exact: false,
    },
]


const Sidebar = props => {
    const collapseOpen = props.collapse

    return (
        <Collapse isOpen={collapseOpen}>
            <Nav className="px-2" vertical>
                <NavbarBrand
                    className="mx-auto d-none d-md-block"
                    href='/'>
                    <img src={logo} />
                    <span className="sidebar__title">CEREBRO ORC</span>
                </NavbarBrand>
                <Profile className="d-none d-md-flex" avatar={avatar} name={'Phạm Trung Hiếu'} email={'hieupt.ai@gmail.com'} />
                {navFuncItem.map(({ title, to, icon, exact }, idx) => {
                    return <NavItem key={idx} >
                        <NavLink
                            to={to}
                            exact={exact}
                            className="sidebar__link"
                            activeClassName="sidebar__link--active">
                            {icon}
                            <span>{title}</span>
                        </NavLink>
                    </NavItem>
                })}
                <hr />
                {navOtherItem.map(({ title, to, icon, exact }, idx) => {
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
                })}
            </Nav>
        </Collapse>
    )
}
export default Sidebar