import React, { useEffect, useState } from 'react'
import './BuyCoins.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'

export default function BuyCoins() {
    const navigate = useNavigate()
    const {BACKEND_HOSTING_URL, authorizationToken} = useAuth()
    const [coins_arr, setCoins_arr] = useState([])
    
    const getAllCoinsPlans = async () => {
        try {
            const response = await fetch(`${BACKEND_HOSTING_URL}/api/coins/get_all_coins_plans`, {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken
                },
            })

            if(response.ok){
                setCoins_arr(await response.json())
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllCoinsPlans()
    }, [])

    const handleBuyCoin = (coin_details) => {
        try{
        //    console.log(coin_details);
           navigate('/make_payment', {state: {coin_details}})
        }catch(error){
            console.log(error);   
        }
    };

  return (
    <>
        <div className="outer_buycoin">
            <div className="coin_inner coin_conatiner">
                {
                    coins_arr.map((val, index) => {
                        return (
                            <div className="pricing_card" key={index}>
                                <div className='price_details'>
                                    <div className="img_box">
                                        <img src="../coins.png" alt="coins" />
                                    </div>
                                    <div className="total_coin">
                                        <h3>{val.coin} 🪙</h3>
                                    </div>
                                    <div className="price_exp">
                                        <p>price: &#x20B9;{val.price}</p>
                                        <p>expires-in: {val.expire}</p>
                                    </div>
                                    <div className="decp">
                                        <p>{val.description}</p>
                                    </div>
                                </div>
                                <div className='buy_coin'>
                                    {/* <button>Buy Coin</button> */}
                                    <button onClick={() => handleBuyCoin(val)}>&#x20B9; {val.price}</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>
  )
}
