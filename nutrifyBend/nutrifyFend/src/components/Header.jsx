import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
export default function Header()
{

    const loggedData = useContext(UserContext);
    const navigate = useNavigate();

    function logout()
    {
        localStorage.removeItem("nutrify-user");
        loggedData.setLoggedUser(null);
        navigate("/login");

    }

    return (
        <div className="header">
        <ul className="links">
            <div className="main-link">
              <li className="link"><Link to ="/track">Track</Link></li>
              <li className="link"><Link to="/diet">Diets</Link></li>
            </div>
              <li onClick={logout}>Logout</li>
        </ul>
    </div>
    )
}

