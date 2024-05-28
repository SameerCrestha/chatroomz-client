import React from 'react'
import './TextContainer.css'
import onlineIcon from '../../icons/onlineIcon.png'
import dropDown from '../../icons/dropDown.png'
import { toTitleCase } from '../../utility/toTitleCase'
const TextContainer = ({users}) => {
    let img= document.querySelector('.dropDownImg');
    let list = document.querySelector('.bannerList');
    function onClick(){
       img.classList.toggle("activeDropDownImg");
       list.classList.toggle("activeBannerList");
    }
    return (
        <div className="bannersContainer">
           <div className="containerHeader">
           <p className="containerHeadText">People currently chatting({users.length}):</p>
           <button className="dropDownButton" type="button">
           <img className="dropDownImg" onClick={onClick} src={dropDown} alt="dropDown"/>
           </button>
           </div> 
            <div className="bannerList">
            {users.map((user)=>
            <div className="nameBanner" key={user.id}>
            <img className="memberOnlineIcon" alt="online" src={onlineIcon}/> 
            {toTitleCase(user.name)}
            </div>
            )}
            </div>
        </div>
    )
}

export default TextContainer
