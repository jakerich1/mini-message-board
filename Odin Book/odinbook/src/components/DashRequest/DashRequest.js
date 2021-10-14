import { useAuth } from '../../useAuth';
import { Link } from 'react-router-dom';
import './style.scss';
import { useEffect, useState } from 'react';
import Post from '../Post/Post';

function DashRequest() {

    const auth = useAuth();
    const axios = require('axios');

    const [request, setRequest] = useState(0)
    const [requesting, setRequesting] = useState(false)
    const [declining, setDeclining] = useState(false)
    const [toggleFetch, setToggleFetch] = useState(true)

    useEffect(() => {
        const fetchRequest = async () => {
            try{
                const responseData = await axios.get(`http://localhost:5000/user/request`, { 
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwt-fe')}`, },
                });
                setRequest(responseData.data.recipient_requests ? responseData.data.recipient_requests[0] : 0)
            }catch(errors){
                console.log(errors)
            }
        }
        fetchRequest()
    }, [axios, toggleFetch])

    const acceptRequest = async () => {
        if(request){
            try{
                setRequesting(true)
                const responseData = await axios.put(`http://localhost:5000/user/request/${request._id}`, {}, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwt-fe')}` }
                });
                console.log(responseData);
                setRequesting(false)
                setRequest(0)
                setToggleFetch(!toggleFetch)
            }catch(errors){
                setRequesting(false)
                console.log(errors);
            }
        }
        return false
    }

    const declineRequest = async () => {
        if(request){
            try{
                setDeclining(true)
                const responseData = await axios.delete(`http://localhost:5000/user/request/${request._id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwt-fe')}` }
                });
                console.log(responseData);
                setDeclining(false)
                setRequest(0)
                setToggleFetch(!toggleFetch)
            }catch(errors){
                setDeclining(false)
                console.log(errors);
            }
        }
        return false
    }

    return (
        <div style={{ display : request ? 'block' : 'none'}} className='friend-request'>
            <div className='fr-header'>
                <div className='fr-head-title'>
                    Friend Requests
                </div>
            </div>
            <div className='fr-body'>
                <div className='request-detail'>
                    <img src={request ? request.issuer.profile_picture : ''} alt='mini profile' />
                    <div className='detail-name'>
                        {request ? request.issuer.facebook.first_name : ''} {request ? request.issuer.facebook.last_name : ''}
                    </div>
                </div>
                <div className='fr-action'>
                    <button onClick={acceptRequest}>
                        <svg style={{ display: requesting ? 'block' : 'none', marginLeft: '10px', marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-rotate-clockwise" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                        </svg>
                        <span style={{ display: requesting ? 'none' : 'block' }}>accept</span>
                    </button>
                    <button onClick={declineRequest}>
                        <svg style={{ display: declining ? 'block' : 'none', marginLeft: '10px', marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-rotate-clockwise" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                        </svg>
                        <span style={{ display: declining ? 'none' : 'block' }}>decline</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DashRequest;
