import "../public/style.css"
import React from "react";
import {nanoid} from "nanoid"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Data from "./Data.json"

import SideNav from "./Components/SideNav";
import Home from "./Components/Home"
import Breakfast from "./Components/Breakfast"
import Lunch from "./Components/Lunch"
import Dinner from "./Components/Dinner"
import Cart from "./Components/Cart"
import PreviousOrders from "./Components/PreviousOrders"

import plusLogo from "./images/logos/plus-logo.png"

export default function App(){

    const [cart, setCart] = React.useState(
        {
            foods:[],
            totalPrice:0,
            date: new Date()
        }
    )
    
    const [previousOrders, setPreviousOrders] = React.useState([])
    
    function foodElementsGenerator(foodObj,removable){
        let ingredients = ""
        for (let i = 0; i < foodObj.ingredients.length; i++) {
            i == foodObj.ingredients.length - 1 ?
            ingredients += foodObj.ingredients[i] :
            ingredients += foodObj.ingredients[i] + ", "
        }

        return (
            <div className = {"food " + foodObj.category} key={nanoid()}>
                <h2 className="food-title">{foodObj.name}{foodObj.count > 1 &&  <span> x{foodObj.count}</span>}</h2>
                <div className="food-information-container">
                    <h4 className="food-price">price: {foodObj.price}$</h4>
                    <h4 className="food-time">time: {foodObj.time} min</h4>
                    <p className="food-ingredients">{ingredients}</p>
                </div>
                <button className="food-btn" onClick={() => addToCart(foodObj)}>
                    <img src={plusLogo} className="plus-logo" />
                    <img src={foodObj.img} className="food-img"/>
                </button>
                {removable && <button className="remove-btn" onClick={() => removeFromCart(foodObj)}>Remove</button>}
            </div>
        )
    }
    
    function addToCart(foodObj){

        if(cart.foods.some(item => item.id === foodObj.id)){

            const tempArray = cart.foods
            const targetIndex = tempArray.findIndex(item => item.id === foodObj.id)
            tempArray.splice(targetIndex,1,
                {
                    ...tempArray[targetIndex],
                    count: tempArray[targetIndex].count + 1
                }
            )
            
            setCart(prevCart => {
                return {
                    foods: tempArray,
                    totalPrice: prevCart.totalPrice + foodObj.price,
                    date: new Date()
                }
            })
        }else{
            setCart(prevCart => {
                return {
                    foods:[...prevCart.foods, {...foodObj, count: 1}],
                    totalPrice: prevCart.totalPrice + foodObj.price,
                    date: new Date()
                }
            })
        }

    }

    function removeFromCart(foodObj){
        
        let newFoodsArray = cart.foods

        for (let i = 0; i < cart.foods.length; i++) {
            if(cart.foods[i].id === foodObj.id){
                if(cart.foods[i].count > 1){
                    newFoodsArray.splice(i,1,{...cart.foods[i],count: cart.foods[i].count - 1})
                }else{
                    newFoodsArray.splice(i,1)
                }
                break
            }
        }

        const newTotalPrice = cart.totalPrice - foodObj.price
        console.log(newFoodsArray)
        setCart(prevCart => {
            return {
                ...prevCart,
                foods: newFoodsArray,
                totalPrice: newTotalPrice
            }
        })
        
    }

    return (
        <Router>
            <div className="app">
                <header className="header">
                    <h2 className="restaurant-title">mamal restaurant</h2>
                </header>
                <SideNav cart={cart} /> 
                <div className="main">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/breakfast">
                            <Breakfast foodElementsGenerator={foodElementsGenerator} foods={Data.breakfast}/>
                        </Route>
                        <Route exact path="/lunch">
                            <Lunch foodElementsGenerator={foodElementsGenerator} foods={Data.lunch}/>
                        </Route>
                        <Route exact path="/dinner">
                            <Dinner foodElementsGenerator={foodElementsGenerator} foods={Data.dinner}/>
                        </Route>
                        <Route exact path="/cart">
                            <Cart cart={cart} setPreviousOrders={setPreviousOrders} setCart={setCart} foodElementsGenerator={foodElementsGenerator}/>
                        </Route>
                        <Route exact path="/previous_orders">
                            <PreviousOrders previousOrders={previousOrders} foodElementsGenerator={foodElementsGenerator} />
                        </Route>
                    </Switch>
                </div>
                <footer className="footer">mohammadpourzand@yahoo.com</footer>
            </div>
        </Router>
    )
}
