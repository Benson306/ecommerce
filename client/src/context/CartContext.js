import { createContext, useContext, useReducer } from "react";
import Reducer, { initialState } from "../utils/Reducer";


const CartContext = createContext();

export const CartProvider = ({ children }) =>{
    const [state, dispatch] = useReducer(Reducer, initialState);

    const addToCart = (product) => {
        const itemIndex = state.products.findIndex(item => item._id === product._id);

        if(itemIndex >= 0){
            state.products[itemIndex].quantity += 1;

            updatedPrice(state.products);
            
        }else{
            let newProduct = {...product, quantity: 1}

            const updatedCart = state.products.concat(newProduct);
    
            updatedPrice(updatedCart);
    
            dispatch({
                type:"ADD_TO_CART",
                payload: {
                    products: updatedCart
                }
            })
        }
    }

    const addQuantity = (id) =>{
        const itemIndex = state.products.findIndex(item => item._id === id);

        if(itemIndex >= 0){
            state.products[itemIndex].quantity += 1;
        }

        updatedPrice(state.products);
    }

    const minusQuantity = (id) =>{
        const itemIndex = state.products.findIndex(item => item._id === id);

        if(itemIndex >= 0){
            if(state.products[itemIndex].quantity > 1){
                state.products[itemIndex].quantity -= 1;
            }
        }

        updatedPrice(state.products);
    }

    const removeFromCart = (product) =>{
        const updatedCart = state.products.filter(currentProduct => 
            currentProduct._id !== product._id
        )

        updatedPrice(updatedCart);

        dispatch({
            type:"REMOVE_FROM_CART",
            payload: {
                products: updatedCart
            }
        })
    }

    const updatedPrice = (products) =>{
        let total = 0;

        products.forEach(product => total += (Number(product.price) * product.quantity))

        dispatch({
            type: "UPDATE_PRICE",
            payload: {
                total: total
            }
        })
    }

    const updateCounty = (county) =>{
        dispatch({
            type: "ADD_DELIVERY_COUNTY",
            payload: {
                deliveryCounty: county
            }
        })
    }

    const updatePickup = (pickup) =>{
        dispatch({
            type: "ADD_PICKUP_POINT",
            payload: {
                pickupPoint: pickup
            }
        })
    }

    const value = {
        total: state.total,
        products: state.products,
        addToCart,
        minusQuantity,
        addQuantity,
        removeFromCart,
        updateCounty,
        updatePickup
    }

    return <CartContext.Provider value={value}>
        { children }
    </CartContext.Provider>
}

const useCart = () =>{
    const context = useContext(CartContext);

    if (context === 'undefined'){
        throw new Error("useart must be used within CartContext")
    }

    return context;
}

export default useCart;