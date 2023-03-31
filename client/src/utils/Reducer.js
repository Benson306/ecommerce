export const initialState = {
    total: 0,
    products: [],
    deliveryCounty: null,
    pickupPoint: null
}


const Reducer = (state, action) =>{
    const { type , payload } = action;
    
    switch(type){
        case "ADD_TO_CART":
            return {
                ...state,
                products: payload.products
            }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                products: payload.products
            }
        case "UPDATE_PRICE":
            return {
                ...state,
                total: payload.total
            };
        case "ADD_DELIVERY_COUNTY":
            return {
                ...state,
                deliveryCounty: payload.deliveryCounty
            }
        case "ADD_PICKUP_POINT":
            return {
                ...state,
                pickupPoint: payload.pickupPoint
            }
        default:
            throw new Error(`No case for type ${type} found in reducer`)
    }
}




export default Reducer;