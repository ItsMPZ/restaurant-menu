export default function Dinner(props){
    const foods = props.foods
    const foodsElements = foods.map(food => {
        return props.foodElementsGenerator(food)
    })
    return (
        <div className="dinner">
            {foodsElements}
        </div>
    )
}