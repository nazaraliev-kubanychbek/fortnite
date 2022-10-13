import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RaritiesTop from './RaritiesTop';
import RaritiesRight from './RaritiesRight';
const Rarities = ({ checkScroll, selectedCategory, setSelectedCategory, filterSkin }) => {
    const rarities = useSelector(s => s.shop.rarities);

    return (
       <>
       {
        checkScroll === 'top'
        ? <RaritiesTop
         selectedCategory={selectedCategory}
         setSelectedCategory={setSelectedCategory}
         rarities={rarities}
         filterSkin={filterSkin}
         />
        : <RaritiesRight
        checkScroll={checkScroll}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        rarities={rarities}
        filterSkin={filterSkin}
        />
       }
       </>
    );
}

export default Rarities;
