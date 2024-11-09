import React, { useState } from 'react'
import './MakePayment.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'


export default function MakePayment() {
    const [base64Image, setBase64Image] = useState("../ScreenShot.png")
    const location = useLocation()
    const {coin_details} = location.state || {}
    const navigate = useNavigate()
    const {BACKEND_HOSTING_URL, authorizationToken, user} = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const uploadImage = (evt) => {
        const file = evt.target.files[0]

        if(file){
            const reader = new FileReader()
            reader.onload = (e) => {
                const base64Image = e.target.result;
                setBase64Image(base64Image);
            };
            reader.readAsDataURL(file);
        }
    }
    const onSSSubmit = async (base64ss) => {
        // console.log(base64ss);
        setIsLoading(true)
        try {
            const response = await fetch(`${BACKEND_HOSTING_URL}/api/qr/payments/send_coin_request`, {
                method: 'POST',
                headers: {
                    Authorization: authorizationToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: user.email,
                    price: coin_details.price,
                    coins: coin_details.coin,
                    img: base64Image
                })
            })
            if(response.ok){
                setIsLoading(true)
                navigate('/thank_you')
                toast.success('Coins Request Send Successfully')
            }else{
                setIsLoading(true)
                toast.error("Some Error Occured Please Resend")
            }
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <>
    <img src="loading.gif" alt="" style={{position: "fixed", zIndex: '5', left: "50%", top: "50%", transform: "translate(-50%, -50%)", height: "5rem"}}
            className={isLoading ?'':'payment_loading'}/>
    
    <div className={isLoading ? `payment_outer blur_background`: 'payment_outer'}>
        

        <div className="payment_box">
            <h2>Make Payment</h2>
            <div className="gpay_img">
                <img src="GooglePay_QR.png" alt="Google Pay QR Code" />
            </div>
        </div>

        <div className="screentshot_div">
            <h2>Upload Screenshot of Successful Payment</h2>
            <div className="upload_ss">
                <input type="file" name="" id="" onChange={uploadImage} accept='image/*'/>
                <img src={base64Image} alt="Payment Screenshot" />
            </div>
            <div className="submit_ss">
                <div className="note">
                    <h3>Note:</h3>
                    <p>After completing your payment, please upload a screenshot of the transaction as proof. Note that if the screenshot is invalid or appears to be fake, coins will not be added to your account. We kindly ask for your honesty in this process. Our team will carefully review each submission, and if all details are verified, your coins will be creadited to your account within 3-4 hours. Thank you for your cooperation.</p>
                </div>
                <button onClick={() => onSSSubmit(base64Image)}>Submit Screenshot</button>
            </div>
        </div>
    </div>
    </>
  )
}
