import {nanoid} from "nanoid"
export default function PreviousOrders(props){
    
    const previousOrdersElements = props.previousOrders.map(previousOrder => {

        const foodsElements = previousOrder.foods.map(food => props.foodElementsGenerator(food))
        
        const year = previousOrder.date.getFullYear().toString().slice(2)
        const month = (previousOrder.date.getMonth() + 1).toString() 
        const day = previousOrder.date.getDate().toString()
        const hour =previousOrder.date.getHours().toString()
        const minute =previousOrder.date.getMinutes().toString()
        
        return (
            <div key={nanoid()}>
                <h4>Date: {year}/{month}/{day} --- {hour}:{minute}</h4>
                <h3>Total Price: {previousOrder.totalPrice}$</h3>
                <div className="previous-orders-foods">{foodsElements}</div>
            </div>
        )
    })

    return (
        <div className="previous-orders">
            {!previousOrdersElements.length && <p>you have not submitted any order yet!!!</p>}
            {previousOrdersElements.reverse()}
        </div>
    )
}