import React from 'react';

const RaritiesTop = ({filterSkin, selectedCategory,rarities,setSelectedCategory}) => {
    return (
        <div className={ 'home__rarities home__rarities-top'}>
            <div className={
                     'home__rarities-row'
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

export default RaritiesTop;
