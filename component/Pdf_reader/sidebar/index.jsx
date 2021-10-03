import {
    Collapse,
    Nav,
    NavbarBrand,
    NavItem
} from "reactstrap"
import { NavLink } from 'react-router-dom'
import Profile from "../../profile"

import Icon from "../../../global/icon"
import logo_def from "../../../assets/image/logo.png"
import avatar_def from "../../../assets/image/avatar.svg"

const navFuncItem = [
    {
        title: "Templates",
        to: '/templates',
        icon: <Icon.TEMPLATE />,
        exact: false,
    }
]

// const navOtherItem = [
//     {
//         title: "Toolbox",
//         to: '',
//         icon: <Icon.SETTING />,
//         exact: false,
//     }
// ]

const SidebarPdf = props => {

    const collapseOpen = props.collapse
    const { className } = props
    const { logo, title } = props
    const { avatar, name, email } = props

    const addRect = () => {
        props.addRect()
    }
    const deleteRect = () => {
        props.deleteRect()
    }

    return (
        <Collapse
            className={className}
            isOpen={collapseOpen}>
            <div className="sidebar__sticky h-100">
                <Nav className="px-2" vertical>
                    <NavbarBrand
                        className="d-none d-md-block"
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
                    <div className="sidebar__tool-box position-relative">
                        <Icon.SETTING />
                        <span>Toolbox</span>
                        <div className="tool position-absolute">
                            <div className="tool__item" onClick={addRect}>ADD RECT</div>
                            <div className="tool__item" onClick={deleteRect}>DEL RECT</div>
                        </div>
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
    )
}
export default SidebarPdf