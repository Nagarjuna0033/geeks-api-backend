import { useState } from "react";
import Result from "./Result";
import userIcon from "../user.svg";
export default function Search() {
    const [user, setUser] = useState("");
    const [info, setInfo] = useState(null);
    const changeInfo = (e) => {
        setInfo(e);
    };

    // "https://www.geeksforgeeks.org/_next/image/?url=https%3A%2F%2Fmedia.geeksforgeeks.org%2Fauth%2Fprofile%2Fgyetx5wfq7jdesj59wff&w=256&q=75"

    const getUser = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/user/${user}`);
            const result = await res.json();
            changeInfo(result);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="container">
                <div className="profile-pic">
                    <img
                        src={
                            info &&
                            info["info"] &&
                            info["info"]["profile"] !==
                                "https://www.geeksforgeeks.org"
                                ? info["info"]["profile"]
                                : info && info["error"]
                                ? userIcon
                                : userIcon
                        }
                        alt="User"
                    />
                </div>
                <div className="form">
                    {/* <h3>Get info</h3> */}
                    <form>
                        <input
                            type="text"
                            onChange={(e) => {
                                setUser(e.target.value);
                            }}
                            placeholder="Enter Username"
                        />
                        <button type="submit" onClick={getUser}>
                            Search
                        </button>
                    </form>
                </div>
                {info && <Result user={info} />}
            </div>
        </>
    );
}
// https://www.geeksforgeeks.org/user/jrevanth/
