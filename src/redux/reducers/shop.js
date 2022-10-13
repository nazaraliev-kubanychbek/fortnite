import axios from 'axios';

const GET_SHOP = 'GET_SHOP';
const ADD_CART = 'ADD_CART';
const GET_DETAILS = 'GET_DETAILS';
const GET_RARITIES = 'GET_RARITIES';
const DELETE_CART = 'DELETE_CART';
const KEY = '18e49612-8beeaeac-5902fe53-21bda48a';


const initState = {
    shop: [],
    cart: [],
    details: {},
    rarities: []
};


export default (state = initState, action) => {
    switch (action.type) {
        case GET_SHOP: {
            return {
                ...state,
                shop: action.shop,
                details: {}
            }
        }
        case ADD_CART: {
            return {
                ...state,
                cart: [action.obj, ...state.cart]
            }
        }
        case GET_DETAILS: {
            return {
                ...state,
                details: action.details
            }
        }
        case GET_RARITIES :{
            return {
                ...state,
                rarities: action.rarities
            }
        }
        case DELETE_CART :{
            return {
                ...state,
                cart: state.cart.filter((item)=> {
                    return item.offerId !== action.obj.offerId
                })
            }
        }
        default: return state
    }

}


export const getShop = () => {
    return (dispatch) => {
        axios.get("https://fortniteapi.io/v2/shop?lang=en", {
            headers: {
                Authorization: KEY
            }
        }).then(({ data }) => {
            return dispatch({ type: GET_SHOP, shop: data.shop })
        })
    }
}

export const addCart = (obj) => {
    return (dispatch) => {
        return dispatch({ type: ADD_CART, obj })
    }
};
export const getDetails = (id) => {
    return (dispatch) => {
        axios(`https://fortniteapi.io/v2/items/get?id=${id}&lang=en`, {
            headers: {
                Authorization: KEY
            }
        }).then(({ data }) => dispatch({ type: GET_DETAILS, details: data.item }))
    }
}

export const getRarities = () =>{
    return (dispatch) =>{
axios.get('https://fortniteapi.io/v2/rarities?lang=en', {
    headers: {
        Authorization: KEY
    }
}).then(({data})=> dispatch({type:GET_RARITIES, rarities: data.rarities}))
    }
}

export const deleteCart = (obj) => {
    return (dispatch) => {
      return  dispatch({type: DELETE_CART , obj})
    }
}
