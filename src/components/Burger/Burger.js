import React from 'react';
import classes from './Burger.module.css';
import BI from './BurgerIngredient/BurgerIngredient';
import {withRouter} from 'react-router-dom'; //we can use this if we don't want to manually add props from top level component
const burger = (props) => { 


    let orderList = [];
    console.log('order:');
    console.log(props.ingsOrder);
    for (let i=0; i<props.ingsOrder.length; i++){
        orderList.push(<BI type={props.ingsOrder[i]} key={i}/>)
    }

    /* if (transIng.length === 0) {
        transIng = <p>Please start adding ingredients!</p>
    } */
    if (orderList.length === 0) {
        orderList = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BI type='bread-top'/>
            {orderList}
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