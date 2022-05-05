import React from 'react';
import { Link } from 'react-router-dom';
import NewPost from '../post/NewPost';
import ChangeUserConfig from '../userConfig/ChangeUserConfig';

import { UserContext } from '../../auth';

export default function Navbar(){
    const { currentUser } = React.useContext(UserContext);
    const [isNewPost, setIsNewPost] = React.useState(false);
    const [isUserConfig, setIsUserConfig] = React.useState(false);

    return (
        <nav className='navbar fixed-top navbar-light bg-light'>
            <div className="container">
                <Link to='/' className='navbar-brand'>Senacgram</Link>
                <ul className='navbar-nav me-auto flex-row'>
                    <li className='nav-item'>
                        <Link className='nav-link' to="/explorer">Explorar</Link>
                    </li>
                </ul>
                { currentUser && 
                    <ul className='navbar-nav ms-auto flex-row'>
                        <li className='nav-item mx-2'>
                            <button className="btn" onClick={()=>setIsNewPost(!isNewPost)}>New Post</button>
                            <NewPost isNewPost={isNewPost} />
                        </li>
                        <li className='nav-item'>
                            <button className="btn" onClick={()=>setIsUserConfig(!isUserConfig)}>{ currentUser.name }</button>
                            <ChangeUserConfig isUserConfig={isUserConfig} />
                        </li>
                    </ul>
                }
            </div>
        </nav>);
}