import React, { Component} from 'react';
import FacebookLogin from '@greatsumini/react-facebook-login';

export default class FbLogin extends Component {

    render() {
        return (
            <FacebookLogin
                appId="3058375291074190"
                onSuccess={(response) => {
                    this.props.auth.signin(response.accessToken);
                }}
                onFail={(error) => {
                    console.log('Login Failed!', error);
                }}
                onProfileSuccess={(response) => {
                    //console.log('Get Profile Success!', response);
                }}
            />
        );
    }
}