import * as React from 'react';
import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import apiService from '../../utils/apiService';


const Donation = () => {
    
    const stripe = useStripe();
    const elements = useElements();
    const url = 'http://localhost:3000/api/donate';

    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const nameHandle = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value);
    const amountHandle = (e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.currentTarget.value);
    const messageHandle = (e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.currentTarget.value);

    const submitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const card = elements.getElement(CardElement);
        try {
            const { token } = await stripe.createToken(card);
            const result = await apiService(url, 'POST', { token, amount, message });
            console.log(result); //in practice, would probably throw this to a route that posts to a database table
            setName('');
            setAmount('');
            setMessage('');
            card.clear();
            alert(result.message);
        } catch(e) {
            console.log(e);
            alert('Something went wrong with your payment. Please check your info and try again.');
        }
    }

    return(
        <div className="wrapper container">
            <form onSubmit={submitHandle} action="submit" className="form-group border border-dark shadow-lg rounded p-3 mt-3">
                <label htmlFor="name">Name</label>
                <input onChange={nameHandle} type="text" name="name" id="nameinput" placeholder="Enter your name here" className="border border-primary shadow form-control"/>
                <label htmlFor="amount" className="mt-3">Amount</label>
                <input value={amount} onChange={amountHandle} type="text" name="amount" id="amountinput" placeholder="Enter donation amount here" className="border border-primary shadow form-control"/>
                <label htmlFor="card" className="mt-3">Card Info (No. -- Exp Date -- CVC)</label>
                <CardElement className="border border-primary shadow mb-3 p-2 rounded" />
                <label htmlFor="message" className="mt-3">Optional message to attach to your donation</label>
                <input onChange={messageHandle} type="text" name="message" id="messageinput" className="border border-primary shadow form-control"/>
                <button type="submit" className="btn btn-lg btn-success shadow my-3">Donate!</button>
            </form>
        </div>
    )

}

export default Donation;