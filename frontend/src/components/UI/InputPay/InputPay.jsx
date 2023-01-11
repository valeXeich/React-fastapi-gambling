import {useState, useContext, React} from 'react';
import UserService from '../../../API/UserService';
import { AuthContext } from '../../../contex';
import './InputPay.css';

const InputPay = ({selected, setSuccess, setError, method}) => {

    const {authData, setAuthData} = useContext(AuthContext);

    const [value, setValue] = useState('');

    const send = () => {
        if (!authData.auth) {
            setError("You must be logged in");
            return
        }
        if (!selected) {
            setError("Choose Deposit/Withdraw method");
            return
        }
        if (method === 'Deposit') {
            UserService.deposit(value, setError, setSuccess);
        } else {
            UserService.withdraw(value, setError, setSuccess);
        }
        setValue('');
    }

    return (
        <div className='mt-2 d-flex justify-content-between'>
            <input value={value} onChange={e => setValue(e.target.value)} placeholder='USD' className="form-control input-pay shadow-none"/>
            <button onClick={send}  className='btn btn-success me-4'>{method}</button>
        </div>
    );
};

export default InputPay;