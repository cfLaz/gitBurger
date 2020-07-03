import {BurgerBuilder} from './BurgerBuilder'; //stipping out connection to Redux
import BConstrols from '../../components/Burger/BuildControls/BuildControls';
import React from 'react';
import {configure, shallow} from 'enzyme' ;
import Adapter from 'enzyme-adapter-react-16';

configure ( {adapter: new Adapter()});

describe('<BurgerBuilder />',()=>{

    let wrapper;
    beforeEach(() =>{
        wrapper = shallow(<BurgerBuilder onInitIng={() => {}} />);
    })

    it('should render Burger Controls if ingredients exist',()=> {
        
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BConstrols)).toHaveLength(1);
        
    })
})