import { useState, useEffect } from 'react';
import UserItem from './UserItem';


type User = {
    userID: string,
    displayName: string,
    picture: string,
    score: number
}


const LeaderBoard = () => {

    const [users, setUsers] = useState<User[]>([])
    const [sort, setSort] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        const xhttp = new XMLHttpRequest();
    
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                setUsers(JSON.parse(xhttp.responseText));
            }
        }
    
        xhttp.open('GET', 'http://localhost:8080/api/scores');
        xhttp.send();
    }, []);

    let userSortedScore: User[] = users;
    if (sort === 'desc') {
        userSortedScore = users.sort((a, b) => b.score - a.score);
    } else {
        userSortedScore = users.sort((a, b) => a.score - b.score);
    }

    function handleSort() {
        setSort(sort === 'asc'? 'desc' : 'asc');
    }

    const userItems = userSortedScore.map(user => <UserItem displayName={user.displayName} score={user.score} img={user.picture}/>)
    
    return (
        <div>
            <h2>LeaderBoard</h2>
            <button onClick={handleSort}>{sort}</button>
            <ul className='item-wrapper'>
                {userItems}
            </ul>
        </div>
    )
}

export default LeaderBoard;