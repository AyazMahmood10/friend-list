import React from 'react';

const FriendListItem = (props) => {

    return (
        <>
            <div className="mainList">
                <div>
                    <h1> {props.item.name} </h1>
                    <span> is your friend </span>
                </div>
                <div>
                    <button className="favoriteButton" onClick={props.toggleFavorites}> Favorites </button>
                </div>
                <div>
                    <button className="deleteButton" onClick={props.deleteFriend}> Delete </button>
                </div>

            </div>
        </>
    )
};

export default FriendListItem;