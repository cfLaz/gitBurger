import React from 'react';
import {configure, shallow} from 'enzyme' ;
 //we use shallow because we want to render just one compoennet without loading ones that are inside of that compoenent.

 import Adapter from 'enzyme-adapter-react-16'; //can name it whatever apparently??
 import NavItems from './NavigationItems';
 import NavItem from './NavigationItem/NavigationItem';

configure ( {adapter: new Adapter()}); //with this, anzyme is connected (for JSX?)
let wrapper;
//executed before each test
beforeEach(()=> {
    wrapper= shallow(<NavItems/>)
});
 //first argument can be any string I like
 // describe is a test suite and 'it' is a test
describe('<NavigationItems />', () => {
    //outputed to the console
    it('shuold render two <NavigationItem/> elements if not authenticated', () => { //needs JSX as an arg (so, you have to import React)
       /*  wrapper = shallow(<NavItems/>);
        //define the thing you want to check, enabled globally by Jest */
        expect(wrapper.find(NavItem)).toHaveLength(2); //expect 2 NavItem components
        
    })

    it('shuold render three <NavigationItem/> elements if authenticated', () => {           //passses it as true
        
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavItem)).toHaveLength(3); 
        
    })

    it('shuold expect logout button', () => {           
        
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavItem link='/logout'>Log out</NavItem>)).toEqual(true); 
        
    })
})
//ejf0w9iug0w9ig9

//Enzyme enables unit testing, (we don't have to run the whole application from scratch in order to test one component)