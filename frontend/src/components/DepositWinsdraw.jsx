import {useState, React} from 'react';
import Cards from './UI/Cards/Cards';
import InputPay from './UI/InputPay/InputPay';


const DepositWinsdraw = () => {

    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [selected, setSelected] = useState(false);

    return (
        <div>
            <div className="container">
                {error
                ? <div className="alert alert-danger mt-4 mb-0" role="alert">
                    {error}
                </div>
                : ''
                }
                {success
                ? <div className="alert alert-success mt-4 mb-0" role="alert">
                    {success}
                </div>
                : ''
                }
                <div className="row">
                    <div className="col-12">
                        <h4 className='text-white mt-3'>Deposit</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Cards method={'Deposit'} setSelected={setSelected}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <InputPay selected={selected} setSuccess={setSuccess} setError={setError} method={'Deposit'}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h4 className='text-white mt-3'>Withdraw</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Cards method={'Withdraw'} setSelected={setSelected}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <InputPay selected={selected} setSuccess={setSuccess} setError={setError} method={'Withdraw'}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepositWinsdraw;