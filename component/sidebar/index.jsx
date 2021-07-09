import {
    Collapse,
    Nav,
    NavbarBrand,
    NavItem
} from "reactstrap"
import { NavLink } from 'react-router-dom'
import Profile from "../profile"

import Icon from "../../global/icon"
import logo_def from "../../assets/image/logo.png"
import avatar_def from "../../assets/image/avatar.svg"

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
    const { className } = props
    const { logo, title } = props
    const { avatar, name, email } = props

    return (
        <Collapse
            className={className}
            isOpen={collapseOpen}>
            <div className="sidebar__sticky">
                <Nav className="px-2" vertical>
                    <NavbarBrand
                        className="mx-auto d-none d-md-block"
                        href='/'>
                        <img src={logo ?? logo_def} />
                        <span className="sidebar__title">{title ?? "CEREBRO ORC"}</span>
                    </NavbarBrand>
                    <Profile
                        className="d-none d-md-flex"
                        avatar={avatar ?? avatar_def}
                        name={name ?? 'Your name'}
                        email={email ?? 'Your email'}
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
            </div>
        </Collapse>
    )
}
export default Sidebar