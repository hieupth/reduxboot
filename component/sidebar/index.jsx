import {
    Collapse,
    Nav,
    NavbarBrand,
    NavItem
} from "reactstrap"
import { NavLink } from 'react-router-dom'
import Profile from "../profile"
import { useMediaQuery } from "react-responsive";

import Icon from "../../global/icon"
import logo_def from "../../assets/image/logo.png"
import avatar_def from "../../assets/image/avatar.svg"
import { useTypedSelector } from "reduxboot/app/store";

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

    const isBigScreen = useMediaQuery({
        query: '(min-width: 768px)'
    })

    const collapseOpen = props.collapse
    const { logo, title } = props

    const user = useTypedSelector(state => state.accountSlice.data)

    return (
        <Collapse isOpen={isBigScreen ? collapseOpen : !collapseOpen}>
            <Nav className="px-2" vertical>
                <NavbarBrand
                    className="mx-auto d-none d-md-block"
                    href='/'>
                    <img src={logo ?? logo_def} />
                    <span className="sidebar__title">{title ?? "CEREBRO ORC"}</span>
                </NavbarBrand>
                <Profile
                    className="d-none d-md-flex"
                    avatar={user.avatar ?? avatar_def}
                    name={user.name ?? 'Phạm Trung Hiếu'}
                    email={user.email ?? 'hieupt.ai@gmail.com'}
                />
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