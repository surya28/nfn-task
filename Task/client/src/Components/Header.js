import React from 'react'
import '../Styles/header.css';
import { useHistory } from 'react-router-dom';

function Header() {
    const history = useHistory();
    const logOut = () => {
        localStorage.removeItem('token');
        history.push('/');
    }
    return (
        <div className="container-fluid">
            <p className="p">
                <span onClick={() => history.push('/tracks')}>Tracks</span>
                <span onClick={() => history.push('/albums')}>Albums</span>
                <span onClick={() => history.push('/playlists')}>Playlists</span>
                <span onClick={
                    () => {
                        logOut();
                    }
                }><i className="fas fa-power-off"></i> Logout</span>
            </p>
        </div>
    )
}

export default Header
