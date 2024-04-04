import { useEffect, useRef, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"
import Header from './Header'

export default function Diet()
{

    let loggedData = useContext(UserContext)
    const [items,setItems] = useState([]);
    // console.log(loggedData);
    const [date,setDate] = useState(new Date())

    let [total,setTotal] = useState({
        totalCaloreis:0,
        totalprotien:0,
        totalCarbs:0,
        totalFats:0,
        totalFiber:0
    })

    useEffect(()=>{
        // console.log(loggedData.loggedUser.userid);
        fetch(`https://nutrify.onrender.com/track/${loggedData.loggedUser.userid}/${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${loggedData.loggedUser.token}`
            }
        })
        .then((response)=>response.json())

        .then((data)=>{
            // console.log(data);
            setItems(data);
            // console.log(items);
        })
        .catch((err)=>{
            console.log(err);
        })

    },[date, loggedData ])

    useEffect(()=>{
        calculateTotal();
    },[items])

    function calculateTotal()
    {

        let totalCopy = {
            totalCaloreis:0,
            totalprotien:0,
            totalCarbs:0,
            totalFats:0,
            totalFiber:0
        };

        items.forEach((item)=>{
            totalCopy.totalCaloreis += item.details.calories;
            totalCopy.totalprotien += item.details.protien;
            totalCopy.totalCarbs += item.details.carbohydrates;
            totalCopy.totalFats += item.details.fat;
            totalCopy.totalFiber += item.details.fiber;

        })
        setTotal(totalCopy);
    }

    return (
        <section className="container diet-container">
                <Header/>
                <div className="date">
                <p> Select date to see your previous Diet : </p>  &nbsp; &nbsp; <input type="date" onChange={(event)=>{
                 setDate(new Date(event.target.value));
                }}/>
                </div>
                {
                    items.map((item)=>{                    
                        return (
                            <div className="item" key={item._id}>
                                <h3>{item.foodId.name} ( {item.details.calories} Kcal for {item.quantity}g )</h3>
                                <p>protien {item.details.protien}g, Carbs {item.details.carbohydrates}g, Fats {item.details.fat}g, Fiber {item.details.fiber}g</p>
                            </div>
                        )
                    })
                }
        <div className="item">
            <h3>  {total.totalCaloreis} Kcal </h3>
            <p>protien {total.totalprotien}g, Carbs {total.totalCarbs}g, Fats {total.totalFats}g, Fiber {total.totalFiber}g</p>
        </div>
        </section>
    )

}
