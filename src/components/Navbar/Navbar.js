import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import styles from './Navbar.module.css';
import './hamburguer-nav.css';

const Navbar = () => {
    const [showNavLinks, setShowNavLinks] = useState(false);
    const [releaseAnimation, setReleaseAnimation] = useState(false);

    const handleHamburguer = () => {
        setShowNavLinks(!showNavLinks);
        setReleaseAnimation(true);
    }

    const changeAnimation = () => {
        if(!releaseAnimation) return '';
        return showNavLinks ? 'animated' : 'return-animated'
    }

    const {user} = useAuthValue();
    const {logOut} = useAuthentication();

    return (
    <nav className={styles.navbar}>
        <NavLink to='/' className={styles.brand}>
            Mini <span>Blog</span>
        </NavLink>
        <button 
            className="hamburger-nav" 
            onClick={handleHamburguer}
        >
            <div className={"line-1 " + changeAnimation()}></div>
            <div className={"line-2 " + changeAnimation()}></div>
            <div className={"line-3 " + changeAnimation()}></div>
        </button>
        <ul className={styles.links_list + ' ' + changeAnimation()} id='link_list'>
            <li>
                <NavLink 
                to='/' 
                className={({isActive}) => isActive? styles.active: ''}
                >
                    Home
                </NavLink>
            </li>
            {!user ? 
                <>
                    <li>
                        <NavLink 
                        to='/login'
                        className={({isActive}) => isActive? styles.active: ''}
                        >
                            Entrar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                        to='/register'
                        className={({isActive}) => isActive? styles.active: ''}
                        >
                            Cadastrar
                        </NavLink>
                    </li>
                </>
                :
                <>
                    <li>
                        <NavLink 
                        to='/posts/create'
                        className={({isActive}) => isActive? styles.active: ''}
                        >
                            Novo post
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                        to='/dashboard'
                        className={({isActive}) => isActive? styles.active: ''}
                        >
                            Dashboard
                        </NavLink>
                    </li>
                </>
            }
            <li>
                <NavLink 
                to='/about'
                className={({isActive}) => isActive? styles.active: ''}
                >
                    Sobre
                </NavLink>
            </li>
            {user && 
            <li>
                <button onClick={logOut}>Sair</button>
            </li>}
        </ul>
    </nav>
    )
}

export default Navbar;