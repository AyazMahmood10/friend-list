import React, { useState, useEffect } from "react";
import FriendListItem from "./FriendListItem";

const FriendList = () => {

    const [list, setList] = useState([]);
    const [value, setValue] = useState("");
    const [page, setPage] = useState(0);
    const [hasNext, setHasNext] = useState(0);
    const [hasPrev, setHasPrev] = useState(false);



    useEffect(() => {
        let maxPage; 
        if(list.length>0 && list.length%4===0){
            maxPage = Math.floor(list.length/4)-1;
        }else if(list.length%4!==0 && list.length>0){
            maxPage = Math.floor(list.length/4);
        }

        if (page < maxPage) {
            setHasNext(true)
        } else {
            setHasNext(false)
        }

        if (page > 0) {
            setHasPrev(true)
        } else {
            setHasPrev(false)
        }
    }, [page, list.length])


    const handleOnKeyPress = (e) => {

        if (value) {
            if (e.key === "Enter") {
                const arr = [...list, { key: list.length, name: value, isFavorite: false }];
                setList(arr)
                setValue('')
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

    const handleNext = () => {

        if (hasNext) {
            setPage(page + 1)
        }
        console.log(page)
        console.log("handle next")
    }

    const handlePrev = () => {
        if (hasPrev) {
            setPage(page - 1)
        }
        console.log(page);
        console.log("has prev")
    }

    const toggleFavorites = (item) => {
        let arr = [];
        for (let i = 0; i < list.length; i++) {
            if (item.key === list[i].key) {
                list[i].isFavorite = !list[i].isFavorite;
            }
            arr.push(list[i]);
        }
        setList(arr);
        console.log("favoriteToggle")
    }

    const deleteFriend = (item) => {
        let arr = list.filter((element) => (
            item.key !== element.key
        ))
        setList(arr);
        console.log("deleteFriend")
    }


    const renderFriendList = () => {

        let startIndex = page * 4;
        let endIndex = Math.min(startIndex + 4, list.length);

        let tempList = [];
        for (let i = startIndex; i < endIndex; i++) {
            tempList.push(list[i]);
        }
        return (
            tempList.map((item, index) => {
                return (
                    <FriendListItem
                        key={index}
                        item={item}
                        toggleFavorites={() => toggleFavorites(item)}
                        deleteFriend={() => deleteFriend(item)}
                    />
                )
            }))
    }

    return (
        <>
            <h1> Friend List</h1>
            <input
                type="text"
                placeholder="Enter your friend's name"
                value={value}
                onKeyPress={handleOnKeyPress}
                onChange={handleOnChange}
            />
            <div>
                {list.length > 0 &&
                    renderFriendList()
                }
                {list.length === 0 &&
                    <div>
                        <span> Add your friends... </span>
                    </div>
                }
                {
                    hasPrev &&
                    <span onClick={handlePrev}> prev </span>
                }
                {
                    hasNext &&
                    <span onClick={handleNext}> next </span>
                }

            </div>
        </>
    );
};

export default FriendList;
