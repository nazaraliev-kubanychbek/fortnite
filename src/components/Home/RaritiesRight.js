import React,{useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const RaritiesRight = ({checkScroll, selectedCategory, setSelectedCategory, rarities, filterSkin}) => {


    const [showCategories, setShowCategories] = useState(false);
    return (
        <div className={
            checkScroll === 'top'
                ? 'home__rarities home__rarities-top'
                : 'home__rarities home__rarities-right'
        }>
            <button
            onClick={()=>{
                setShowCategories(!showCategories)
            }}
            className={
                checkScroll === 'top'
                    ? 'category-btn-hidden'
                    : 'category-btn-show'
            }>categories <span
            className={
                showCategories
                ? 'arrow arrow-up'
                : 'arrow arrow-down'
            }
            ><FontAwesomeIcon icon={faCaretDown} /></span></button>
            <div className={
                checkScroll === "top"
                    ? 'home__rarities-row'
                    : checkScroll === "right" && showCategories
                    ? "home__rarities-row home__rarities-row-right home__rarities-row-show"
                    : 'home__rarities-row home__rarities-row-right'
            }>
                <button
                    className={
                        selectedCategory === "all"
                            ? "home__rarities-btn home__rarities-selected"
                            : "home__rarities-btn"
                    }
                    onClick={() => {
                        setSelectedCategory("all")
                    }} >all</button>
                {
                    rarities.map((item) => {
                        return <button
                            className={
                                selectedCategory === item.id
                                    ? "home__rarities-btn home__rarities-selected"
                                    : "home__rarities-btn"
                            }
                            onClick={() => {
                                filterSkin(item.id)
                            }} key={item.id}>{item.name}</button>
                    })
                }
            </div>



        </div>
    );
}

export default RaritiesRight;
