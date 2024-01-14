const UserItem = ({ displayName, score, img}: {displayName: string, score: number, img: string}) => {


    return (
        <li className="item">
            <div className="item__avatar">
                <img 
                    className="item_avatar_img"
                    src={img} 
                    alt={`Picture of ${displayName}`}
                />
            </div>
            <span className="item__name">{displayName}</span>
            <span className="item__score">{score}</span>
        </li>
    );
}

export default UserItem;