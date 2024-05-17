import React from "react";
export default function Result({ user }) {
    // const [info, setInfo] = useState({});
    // const changeInfo = (e) => {
    //     setInfo(e);
    // };

    // useEffect(() => {
    //     // console.log("in result:", user);
    //     loadData();
    // }, []);
    console.log("result: ", user);
    return (
        <>
            <div
                className="info-container"
                style={
                    user && user["error"]
                        ? { height: 3 + "rem" }
                        : { height: 15 + "rem" }
                }
            >
                {user && user["error"] ? (
                    <div className="info" style={{ textAlign: "center" }}>
                        <b>Profile not Found </b>
                    </div>
                ) : (
                    <div className="info">
                        <div className="info">
                            <b>Name: </b>
                            <span>{user["info"]["username"]}</span>{" "}
                            <b>
                                <span>
                                    {user["info"]["isCampusAmbassador"]
                                        ? "(Campus Ambassdor)"
                                        : ""}
                                </span>
                            </b>
                        </div>
                        <div className="info">
                            <b>University : </b>
                            <span>
                                {typeof user["info"] !== "undefined"
                                    ? user["info"]["University"] !== ""
                                        ? user["info"]["University"]
                                        : "Unknown"
                                    : user["error"]}
                            </span>
                        </div>
                        <div
                            className="info"
                            style={
                                user["info"]["rank"]
                                    ? { display: "block" }
                                    : { display: "none" }
                            }
                        >
                            <b>Rank : </b>
                            <span>{user["info"]["rank"]}</span>
                        </div>
                        <div className="info">
                            <b>Streak : </b>
                            <span>{user["info"]["streak"]}</span>
                        </div>
                        <div
                            className="info"
                            style={
                                user["info"]["languagesUsed"] === ""
                                    ? { display: "none" }
                                    : { display: "block" }
                            }
                        >
                            <b>Languages Used : </b>
                            <span>{user["info"]["languagesUsed"]}</span>
                        </div>
                        <div className="info">
                            <b>Total Problem Solved: </b>
                            <span>
                                {user["info"]["score"]["totalSolved"]
                                    ? user["info"]["score"]["totalSolved"]
                                    : "0"}
                            </span>
                        </div>
                        <div className="info">
                            <b>Coding Score: </b>
                            <span>
                                {user["info"]["score"]["codingScore"]
                                    ? user["info"]["score"]["codingScore"]
                                    : "0"}
                            </span>
                        </div>
                        <div className="info">
                            <b>Monthly Coding Score: </b>
                            <span>
                                {user["info"]["score"]["monthlyCodingScore"]
                                    ? user["info"]["score"][
                                          "monthlyCodingScore"
                                      ]
                                    : "0"}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
