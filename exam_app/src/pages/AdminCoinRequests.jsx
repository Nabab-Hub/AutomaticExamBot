import React, { useEffect, useState } from 'react'
import './AdminCoinRequests.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'

export default function AdminCoinRequests() {
    const {BACKEND_HOSTING_URL, authorizationToken} = useAuth()
    const [allRequests, setAllRequests] = useState([])

    const getAllRequests = async (req, res) => {
        try {
            const response = await fetch(`${BACKEND_HOSTING_URL}/api/admin/all_requests/get_all_requests`,{
                method: 'GET',
                    headers: {
                        Authorization: authorizationToken
                    }
            })
            const res_data = await response.json()

            if(response.ok){
                setAllRequests(res_data)
                // console.log(res_data);
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        getAllRequests()
    }, [])

    const deleteRequestById = async (id) => {

        try {
            const response = await fetch(`${BACKEND_HOSTING_URL}/api/admin/requests/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: authorizationToken
                }
            })
            if(response.ok){
                toast.success('Requests Deleted Successfuly')
                getAllRequests()
            }else{
                const res_data = await response.json()
                Object.values(res_data).map((err) => {
                    return toast.error(err)
                })
            }
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div className="coins_requests_outer">
        <div className="header">
          <h1>Coin Requests</h1>
        </div>
        <div className="request_box_outer">
          {
            allRequests.map((request, index) => {
              return(
                <div className="user_box" key={index}>
                  <div className="ss">
                    <img src={request.img ? request.img : "../hacker_logo.png"} alt="payment Successful Screenshot" />
                  </div>
                  <div className="box">
                    <p><b>coin:</b> {request.coins}</p>
                    <p><b>price:</b> {request.price}</p>
                  </div>
                  <p>{request.time}<br></br>{request.email}</p>
                  <div className="buttons">
                    <Link to={`/admin/coins_request/${request.email}/edit`}>Update</Link>
                    <button onClick={() => deleteRequestById(request._id)}>Delete</button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
  )
}
