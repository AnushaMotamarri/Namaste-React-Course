import React,{useState,useEffect} from 'react';
import Shimmer from './shimmer';
import StarSvg from './svgs/star_svg';

const RestaurantCard = ({restaurantData}) =>{
    return (
        <div className="card">
            <div className='image-container'>
                <img src = {`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurantData?.info?.cloudinaryImageId}`}></img>

            </div>
                <div className='title'>{restaurantData?.info?.name}</div>
                <div className='rating'><StarSvg/>{restaurantData?.info?.avgRating}</div>
                <div className='cusines'>{restaurantData?.info?.cuisines?.join(', ')}</div>
                <div className='locality'>{restaurantData?.info?.locality}</div>
        </div>
    )
}
export default Body=()=>{
    const [searchText,setSearchText] = useState('');
    const [restaurantList,setRestaurantList]  = useState([]);
    const [filteredRestaurantList,setFilteredRestaurantList]  = useState([])
    async function getRestaurants(){
        try{
            const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.956924&lng=77.701127&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
            const json = await data.json();
            const cardsData = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants||[];
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