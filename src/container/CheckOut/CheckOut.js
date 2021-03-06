import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckSummary from '../../components/Order/ChheckSummary/CheckSummary';
import ContactData from './ContactData/ContactData';

class CheckOut extends Component {
 /*   state={
        ingredients:null,
        totalPrice:0
    } */
    componentWillMount(){
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};
        let price=0;
        for(let param of query){
            if(param[0] === 'price'){
                price=param[1];
            } else{
                ingredients[param[0]]=+param[1];
            }  
        }
     //   this.setState({ingredients:ingredients, totalPrice:price});
    }
    cancelCheckoutHandler=()=>{
        this.props.history.goBack();
    }
    continueCheckOutHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckSummary 
                    ingredients={this.props.ings}
                    cancelCheckout={this.cancelCheckoutHandler}
                    continueCheckOut={this.continueCheckOutHandler}
                />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}/>
            </div>
        )
    }
}

const mapStateToProps =state=>{
    return{
        ings: state.ingredients,
        price:state.totalPrice
    }
}

export default connect(mapStateToProps)(CheckOut);