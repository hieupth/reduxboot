import { NavItem } from "reactstrap"

const Profile = props => {
    const classname = props.className
    return (
        <NavItem className={`sidebar__profile ${classname}`}>
            <img src={props.avatar} />
            <div className="info">
                <p className="info__name">{props.name ?? "Phạm Trung Hiếu"}</p>
                <p className="info__email">{props.email ?? "hieupt.ai@gmail.com"}</p>
            </div>
        </NavItem>
    )
}

export default Profile