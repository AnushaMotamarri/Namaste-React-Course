import React,{useState,useEffect} from 'react';
import Shimmer from './shimmer';

const RestaurantCard = ({restaurantData}) =>{
    return (
        <div className="card">
            <img src = {`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${restaurantData?.data?.cloudinaryImageId}`}></img>
            <h2>{restaurantData?.data?.name}</h2>
            <h3>{restaurantData?.data?.cuisines?.join(' ,')}</h3>
            <h4>{restaurantData?.data?.avgRating}</h4>
        </div>
    )
}
export default Body=()=>{
    const [searchText,setSearchText] = useState('');
    const [restaurantList,setRestaurantList]  = useState([]);
    const [filteredRestaurantList,setFilteredRestaurantList]  = useState([])
    async function getRestaurants(){
        try{
            const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.3730192&lng=78.547636&page_type=DESKTOP_WEB_LISTING");
            const json = await data.json();
            const cardsData = json?.data?.cards[2]?.data?.data?.cards||[];
            setRestaurantList(cardsData);
            setFilteredRestaurantList(cardsData)
       
        }
        catch(e){
            console.log(e)
        }

    }
    useEffect(()=>{
        getRestaurants();
    },[]);
    function filterRestaurants(){
        const filteredCardsData = restaurantList.filter(rest=>((rest.data.name).toLowerCase()).includes(searchText.toLowerCase()));
        console.log(restaurantList,searchText,filteredCardsData)
        setFilteredRestaurantList(filteredCardsData)
    }
    return filteredRestaurantList.length===0?<Shimmer/>:<>
        <div className="search-container">
            <input type="text"
            className="search-input"
            placeholder="search"
            value={searchText}
            onChange={e=>setSearchText(e.target.value)}
            />
            <button className="search-btn" onClick={()=>filterRestaurants()}>Search</button>
        </div>
     <div className="restaurant-list">
     {filteredRestaurantList.map(restaurant =><RestaurantCard restaurantData={restaurant}/>)}
        </div>
    </>
}