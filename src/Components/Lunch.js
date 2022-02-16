export default function Lunch(props){
    const foods = props.foods
    const foodsElements = foods.map(food => {
        return props.foodElementsGenerator(food)
    })
    return (
        <div className="lunch">
            {foodsElements}
        </div>
    )
}