import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHouse, faCartShopping, faCircleInfo} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';

const Header = () => {
    const cart = useSelector(s => s.shop.cart)
    return (
        <header className='header'>
<h1 className='header__logo'>
    <Link to={'/'}>Fortnite</Link>
</h1>
<div className='header__right'>
    <Link to={"/contact"} className='icon'><FontAwesomeIcon icon={faCircleInfo}/></Link>

<Link to={"/"}><FontAwesomeIcon className='icon' icon={faHouse}/></Link>
 <Link to={"/cart"}><FontAwesomeIcon className={cart.length > 0 ? 'icon icon-red' : 'icon'} icon={faCartShopping} /></Link>
 <span className='header__cart-length'>{cart.length === 0 ? "" : cart.length > 9 ? "+9" : cart.length}</span>
</div>
        </header>
    );
}

export default Header;
