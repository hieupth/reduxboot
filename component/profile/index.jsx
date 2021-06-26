import { NavItem } from "reactstrap"

const Profile = props => {
    const { avatar, name, email } = props
    return (
        <NavItem className="sidebar__profile">
            <img src={avatar} />
            <div className="info">
                <p className="info__name">{name}</p>
                <p className="info__email">{email}</p>
            </div>
        </NavItem>
    )
}

export default Profile