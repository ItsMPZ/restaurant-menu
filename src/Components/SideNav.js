import { Link } from "react-router-dom";

import homeLogo from "../images/logos/home-logo.png"
import breakfastLogo from "../images/logos/breakfast-logo.png"
import lunchLogo from "../images/logos/lunch-logo.png"
import dinnerLogo from "../images/logos/dinner-logo.png"
import cartLogo from "../images/logos/cart-logo.png"
import resetLogo from "../images/logos/reset-logo.png"

export default function SideNav(props){
    const cart = props.cart
    let foodsCount = 0
    cart.foods.map(food => foodsCount += food.count)
    return (
        <nav className="side-nav">
            <div className="links-container">
                <Link to="/"><img src={homeLogo} className="logo "/></Link><br/>
                <Link to="/breakfast"><img src={breakfastLogo} className="logo "/></Link><br/>
                <Link to="/lunch"><img src={lunchLogo} className="logo "/></Link><br/>
                <Link to="/dinner"><img src={dinnerLogo} className="logo "/></Link><br/>
                <Link to="/cart">
                    <img src={cartLogo} className="logo "/>
                    {cart.foods.length != 0 && <div className="cart-foods-length">
                        <h4>{foodsCount}</h4>
                    </div>}
                </Link><br/>
                <Link to="/previous_orders"><img src={resetLogo} className="logo "/></Link><br/>
            </div>
        </nav>
    )
}