import React from 'react';
import classes from './Burger.module.css';
import BI from './BurgerIngredient/BurgerIngredient';
import {withRouter} from 'react-router-dom'; //we can use this if we don't want to manually add props from top level component
const burger = (props) => {
    //console.log(props);

    //Object.keys() gives an array of the keys, not values, so it would be ['salad',...]
    let transIng = Object.keys(props.ingredients).map(inKey =>{
        //console.log(inKey);
        return [...Array(props.ingredients[inKey])].map((_,i)=>{
            //console.log(i); --> for salad: 2, .map would go through array of 2 null items, outputing <BI/> two times with different keys (+ i)
            //.map(_,i) -> i represents index.
            return(<BI
             key={inKey+i} type={inKey}
            />
            );
        });
    }).reduce((arr, el) =>{
        return arr.concat(el);
        }, []
    ) 
    console.log(transIng);
    if (transIng.length === 0) {
        transIng = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BI type='bread-top'/>
            {transIng}
            <BI type='bread-bottom'/>
            
        </div>
    );
};

export default withRouter(burger);

/**let x = [2,3,4]
undefined
y= x.m
undefined
c=x.map(a=>{
return 2;
})
(3) [2, 2, 2] */