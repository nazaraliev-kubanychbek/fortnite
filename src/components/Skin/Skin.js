import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addCart, getDetails} from '../../redux/reducers/shop';
import './skin.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import preloader from "../../img/preloader.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeftLong} from '@fortawesome/free-solid-svg-icons';

const Skin = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const KEY = '18e49612-8beeaeac-5902fe53-21bda48a';
    const cart = useSelector(s => s.shop.cart);
    const [similarProducts, setSimilarProducts] = useState([]);
    const initialdetails = useSelector(s => s.shop.details);
    const [details, setDetails] = useState({});
    const findShop = () => {
        axios.get("https://fortniteapi.io/v2/shop?lang=en", {
            headers: {
                Authorization: KEY
            }
        }).then(({ data }) => {
            const obj = data.shop.filter((item) => {
                return item.mainId == params.id
            })[0]
            dispatch(addCart(obj))
        })
    }

    const checkCart = (id) => {
        return cart.findIndex((item) => {
            return item.mainId === id
        }) > -1
    }
    useEffect(() => {
        dispatch(getDetails(params.id));

    }, [params.id]);
    useEffect(() => {
        setDetails(initialdetails);
    }, [initialdetails])
    useEffect(() => {
     if (JSON.stringify(details) != "{}") {

                axios.get("https://fortniteapi.io/v2/shop?lang=en", {
                    headers: {
                        Authorization: KEY
                    }
                }).then(({ data }) => {
                    const filtrArray = data.shop.filter((item) => {
                        return item.mainId != details.id
                    });
                    setSimilarProducts(filtrArray.filter((item) => {
                        return item.rarity.id == details.rarity.id
                    }))
                })

        }
    }, [details]);
    return (
        <section className='skin' >
            <div className='container'>
                {
                    JSON.stringify(details) === "{}" || !details
                        ? <img src={preloader} className="preloader" />
                        : <div className='row skin-relative'>
                           <button
                           onClick={()=>{
                            navigate(-1)
                           }}
                           className='skin__go-back-btn'>
                            <FontAwesomeIcon icon={faArrowLeftLong}/>
                            </button>

                            <div className='col-6'>
                                <img className='skin__img' src={details.images.background} />
                            </div>
                            <div className='col-6'>
                                <h2 className='skin__title'> {details.name} </h2>
                                <p className='skin__description'> {details.description} </p>
                                <p className='skin__rarity'> {details.rarity.name} </p>

                                <p className='skin__details'><span>type:</span> {details.type.name} </p>
                                <p className='skin__details' > <span>added:</span> {details.added.date} </p>
                                <p className='skin__details' > <span>version: </span> {details.added.version} </p>

                                <p className='skin__price'> $ {details.price} </p>

                                {
                                    checkCart(details.id)
                                        ? <span>you already bought it</span>
                                        : <button className='skin__btn-buy'

                                            onClick={findShop}>BUY</button>
                                }


                            </div>
                        </div>
                }
               {
                JSON.stringify(details) === '{}' ? ''
                :  <h3 className='skin__similar'>Similar products:</h3>
               }
                <div className='row'>
                    {
                        similarProducts.map((item) => {
                            return <div key={item.offerId} className='col-3'>

                                <div className='home__card'>
                                    <Link
                                        onClick={() => {
                                            setDetails({});
                                            setSimilarProducts([]);
                                            dispatch(getDetails(item.mainId));
                                        }}
                                        to={`/skin/${item.mainId}`}>
                                        <img className='home__card-img' src={item.displayAssets[0].background} alt="" />
                                    </Link>
                                    <div className='home__card-bottom'>
                                        <Link
                                            onClick={() => {
                                                setDetails({});
                                                setSimilarProducts([]);
                                                dispatch(getDetails(item.mainId))
                                            }}
                                            to={`/skin/${item.mainId}`}>
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
                                                checkCart(item.mainId)
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


            </div>
        </section>
    );
}

export default Skin;
