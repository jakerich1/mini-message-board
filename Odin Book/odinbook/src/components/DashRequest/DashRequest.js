import { useAuth } from '../../useAuth';
import { Link } from 'react-router-dom';
import './style.scss';
import { useEffect, useState } from 'react';
import Post from '../Post/Post';

function DashRequest() {

    const auth = useAuth();
    const axios = require('axios');


    return (
        <div className='friend-request'>
            <div className='fr-header'>
                <div className='fr-head-title'>
                    Friend Requests
                </div>
            </div>
            <div className='fr-body'>
                <div className='request-detail'>
                    <img src='./images/placeholder.png' alt='mini profile' />
                    <div className='detail-name'>
                        Alen Dedja
                    </div>
                </div>
                <div className='fr-action'>
                    <button>accept</button>
                    <button>decline</button>
                </div>
            </div>
        </div>
    );
}

export default DashRequest;
