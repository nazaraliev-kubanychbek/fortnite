import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPhone } from '@fortawesome/free-solid-svg-icons'
import {faTelegram , faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons'
import './contact.scss'

const Contact = () => {
    return (
            <section className='contact'>
                <div className='container'>
                    <h2>
                        FRONTEND developers:
                    </h2>
                    <ul>
                        <li>Aruuke</li>
                        <li>Nazbiyke</li>
                        <li>Emirbek</li>
                        <li>Mirlan</li>
                    </ul>
                    <h2 >Contacts:</h2>
                    <ul className='contacts'  >
                        <li >
                            <a target={"_blank"} href="tel:+996559996474"><FontAwesomeIcon icon={faPhone}/></a>
                            </li>
                            <li>
                            <a  target={"_blank"} href="https://t.me/Kuba_duishobaevich"><FontAwesomeIcon icon={faTelegram}/></a>
            </li>
            <li >
                            <a className='watsapp' target={"_blank"} href="https://wa.me/+996559996474"><FontAwesomeIcon icon={faWhatsapp}/></a>
                            </li>
            <li >
                            <a className='instagram' target={"_blank"} href="https://www.instagram.com/kuba_duishobaevich/"><FontAwesomeIcon icon={faInstagram}/></a>
                        </li>

                    </ul>
                </div>
            </section>
    );
}

export default Contact;
