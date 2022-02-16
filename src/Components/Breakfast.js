export default function Breakfast(props){
    const foods = props.foods
    const foodsElements = foods.map(food => {
        return props.foodElementsGenerator(food)
    })
    return (
        <div className="breakfast">
            {foodsElements}
        </div>
    )
}