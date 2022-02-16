export default function Cart(props){
    const foodsArray = props.cart.foods
    const cartItemsElements = foodsArray.map(item => props.foodElementsGenerator(item,true,true))
    
    
    function finishOrder(){
        props.setPreviousOrders(prevState => [
            ...prevState,
            props.cart
        ])
        props.setCart(
            {
                foods:[],
                totalPrice:0,
                date: new Date()
            }
        )
    }

    return(
        <div className="cart">
            {!cartItemsElements.length && <p>your cart is empty!!!</p>}
            <div className="cart-items">
                {cartItemsElements}
            </div>
            {cartItemsElements.length != 0 && 
                <div className="cart-information">
                    <h3>Total Price: {props.cart.totalPrice}$</h3>
                    <button className="finish-order-btn" onClick={finishOrder}>finish order</button>
                </div>
            }
        </div>
    )
}