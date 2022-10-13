import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import preloader from "../../img/preloader.svg";
import { getShop, addCart, getRarities } from '../../redux/reducers/shop';
import "./home.scss";
import { Link } from 'react-router-dom';
import Rarities from './Rarities';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowUp} from '@fortawesome/free-solid-svg-icons'


const Home = () => {
    const shop = useSelector(s => s.shop.shop);
    const cart = useSelector(s => s.shop.cart);
    const [checkScroll, setCheckScroll] = useState('top')
    const [filterShop, setFilterShop] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const mainSelector = () => {
        return selectedCategory === "all" ? shop : filterShop
    }
    const dispatch = useDispatch();
    const checkCart = (obj) => {
        return cart.findIndex((item) => {
            return item.offerId === obj.offerId
        }) > -1
    }
    const filterSkin = (id) => {
        setSelectedCategory(id);
        setFilterShop(shop.filter((item) => {
            return item.rarity.id == id
        }))
    }

    useEffect(() => {
        dispatch(getShop());
        dispatch(getRarities());
    }, [])
    return (
        <section className='home'
            onScroll={(event) => {
                if (event.currentTarget.scrollTop > 100) {
                    setCheckScroll('right');
                } else if (event.currentTarget.scrollTop < 40) {
                    setCheckScroll('top')
                }

            }}
        >
            <div className='container'>

                <Rarities
                checkScroll={checkScroll}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                filterSkin={filterSkin}
                />
                <div className='row'>
                    {
                        shop.length !== 0 && filterShop.length === 0 && selectedCategory !== "all"
                            ? <h2 className='empty'>Empty category</h2>
                            : shop.length === 0
                                ? <img className='preloader' src={preloader} />
                                : mainSelector().map((item) => {
                                    return <div key={item.offerId} className='col-3'>

                                        <div className='home__card'>
                                            <Link to={`/skin/${item.mainId}`}>
                                                <img className='home__card-img' src={item.displayAssets[0].background} alt="" />
                                            </Link>
                                            <div className='home__card-bottom'>
                                                <Link to={`/skin/${item.mainId}`}>
                                                    <h3>{item.displayName.length > 15
                                                        ? item.displayName.substr(0, 15).trim() + "..."
                                                        : item.displayName
                                                    }</h3>
                                                </Link>

                                                <p>{item.displayDescription.length == 0
                                                    ? "no description"
                                                    : item.displayDescription.length > 15
                                                        ? item.displayDescription.substr(0, 15).trim() + "..."
                                                        : item.displayDescription
                                                }</p>
                                                <p className='home__card-rarity'> {item.rarity.name} </p>
                                                <div className='home__card-btn'>
                                                    <p className='home__card-price'> $ {item.price.finalPrice} </p>
                                                    {
                                                        checkCart(item)
                                                            ? <span>you already bought it</span>
                                                            : <button onClick={() => {
                                                                dispatch(addCart(item))
                                                            }}>BUY</button>
                                                    }

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                })
                    }

                </div>

                {
                    checkScroll === "right"
                    ? <button
                     className='btn-up'
                     onClick={()=>{
                        document.querySelector('.home').scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        })
                     }}
                     ><FontAwesomeIcon icon={faArrowUp}/></button>
                    : ''
                }
            </div>
        </section>
    );
}

export default Home;
