import { useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import toast from 'react-hot-toast' 

export default function Food(props)
{

    const [eatenQuantity,setEatenQuantity] = useState(100);
    const [food,setFood] = useState({});
    const [foodInitial,setFoodInital] = useState({});
    let loggedData = useContext(UserContext);

    useEffect(()=>{
       setFood(props.food);
       setFoodInital(props.food);

      //  console.log(loggedData);
       
    },[props.food])

  
    function calculate(event)
    {
            if(event.target.value.length!=0)
            {
                let quantity = Number(event.target.value);
                setEatenQuantity(quantity);

                let copyFood = {...food};
                copyFood.protein = (foodInitial.protein*quantity)/100;
                copyFood.carbohydrates = (foodInitial.carbohydrates*quantity)/100;
                copyFood.fat = (foodInitial.fat*quantity)/100;
                copyFood.fiber = (foodInitial.fiber*quantity)/100;
                copyFood.calories = (foodInitial.calories*quantity)/100;
                setFood(copyFood);
            }      
    }

    function trackFoodItem()
    {
        let trackedItem = {
            userId:loggedData.loggedUser.userid,
            foodId:food._id,
            details:{
                protein:food.protein,
                carbohydrates:food.carbohydrates,
                fat:food.fat,
                fiber:food.fiber,
                calories:food.calories
            },
            quantity:eatenQuantity
        }

        // console.log(trackedItem);

        fetch(`https://nutrify.onrender.com/track`,{
            method:"POST",
            body:JSON.stringify(trackedItem),
            headers:{
                "Authorization":`Bearer ${loggedData.loggedUser.token}`,
                "Content-Type":"application/json"
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            // console.log(data);
            if(data) toast.success("Food item added sucessfully",{
              style:{
                backgroundColor:'black',
                color:'white'
              }
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <div className="food">
    
            <div className="food-img">
              <img src={food.imageUrl} className ="f-image" alt="error"/>
            </div>
            <h3 className="food-name">{food.name} {food.calories} (Kcal) for {eatenQuantity}G</h3>
            <div className="nutrient">
              <p className="n-title">protein</p>
              <p className="n-value">{food.protien}g</p>
            </div>
            <div className="nutrient">
              <p className="n-title">carbs</p>
              <p className="n-value">{food.carbohydrates}g</p>
            </div>
            <div className="nutrient">
              <p className="n-title">Fat</p>
              <p className="n-value">{food.fat}g</p>
            </div>
            <div className="nutrient">
              <p className="n-title">Fiber</p>
              <p className="n-value">{food.fiber}g</p>
            </div>
    
            <div className="track-control">
            <input type="number" className="inp" placeholder="Quantity in grams" onChange={calculate}/>
              <button className="btn" onClick={trackFoodItem}>Track</button>
            </div>
        </div>
        )
}
