import {useState} from "react";



function Player({initialName,symbol,isActive,onSelect}){
    
    let [isEditing, setIsEditing] = useState(false);
    let [playerName, setPlayerName ] = useState(initialName)

    function handleEditClick(){
        setIsEditing((isEditing) => !isEditing);
        if(isEditing){
            onSelect(symbol,playerName);
        }
        
    }

    function handleChange(event){              
        setPlayerName(event.target.value);
    }
    return(
        <li className={isActive ? "active" : null}>
            <span className="player">
                {isEditing ? <input type="text" placeholder ="Change your name here" defaultValue={playerName} onChange={handleChange} required/> : <span className="player-name">{playerName}</span>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}



export default Player;