import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import "./cart.scss";
import { deleteCart } from '../../redux/reducers/shop';
import emptyCart from '../../img/empty-cart.jpg';

const Cart = () => {
    const cart = useSelector(s => s.shop.cart)
    const dispatch = useDispatch()
    return (
        <section className='cart'>
            <div className='container'>
               {
                cart.length === 0
                ? <img className='cart__empty' src={emptyCart}/>
                : <>
                 {
                    cart.map((item) => {
                        return <div  key={item.offerId} className='cart__item'>
                    <div className='cart__item-left'> <img  src={item.displayAssets[0].background} />  <h3>{item.displayName}</h3> </div>
                    <div className='cart__item-rigth'> <p>  ${item.price.finalPrice} </p>
                    <button onClick={() => {
                        dispatch(deleteCart(item))
                    }}><FontAwesomeIcon icon={faTrash}/></button> </div>
                         </div>

                    })
                }
                <p > total: ${cart.reduce((acc , rec) => {
                    return acc + rec.price.finalPrice
                }, 0)} </p>
                </>
               }
            </div>
        </section>
    );
}

export default Cart;
