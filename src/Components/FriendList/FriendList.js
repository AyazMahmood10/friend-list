import React, { useState } from "react";
import FriendListItem from "./FriendListItem";

const FriendList = () => {

    const [list, setList] = useState([]);
    const [value, setValue] = useState("");

    const handleOnKeyPress = (e) => {

        if (value) {
            if (e.key === "Enter") {
                const arr = [...list, { key:list.length, name:value, isFavorite:false }];
                setList(arr)
            }
        }
    };

    const handleOnChange = (event) => {
        if (!event.target.value.replace(/\s/g, "").length) {
            setValue("");
        } else {
            setValue(event.target.value); //Using event value to change the text in the form accordingly
        }
    };



    const toggleFavorites = (item) => {
        // let arr = [];
        // list.map((element) => {
        //     if (item.key === element.key) {
        //         item.isFavorite = !item.isFavorite;
        //     }
        //     arr = [...arr, item]
        // })
        // setList(arr);
        console.log("favoriteToggle")
    }

    const deleteFriend = (item) => {
        // let arr = list;
        // list.map((element) => {
        //     if (item.key === element.key) {
        //         arr.splice(list.indexOf(item))
        //     }
        // })
        // setList(arr);
        console.log("deletefriends")
    }


    const renderFriendList = () => {
        return(
        list.map((item) => {
            return (
                <FriendListItem
                    item={item}
                    toggleFavorite={()=>toggleFavorites(item)}
                    deleteFriend={()=>deleteFriend(item)}
                />
            )
        }))
    }

    return (
        <>
            <input
                type="text"
                placeholder="Enter your friend's name"
                value={value}
                onKeyPress={handleOnKeyPress}
                onChange={handleOnChange}
            />
            <div>
                {list.length>0 &&
                    renderFriendList()
                }
                {list.length===0 &&
                    <div>
                        <span> Add your friends... </span>
                    </div>
                }
            </div>
        </>
    );
};

export default FriendList;
