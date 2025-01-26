import React from "react";
import "../../styles/layout.css";
import pig from "../../images/pig.png";
const Main = () => {
return (
    <div className="mainCss">
        <div className="info">
        <h2>Welcome Here is main !!!</h2>
        <h2>포괄용돈제 시스템 입니다. !!!</h2>
        <h2>로그인 후 이용해 주세요~</h2>
    </div>
    <img src={pig} alt="Pig" width="300" />
    </div>
)
};

export default Main;
