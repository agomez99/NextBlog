import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import SocialFollow from '../SocialFollow';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faGithub
} from "@fortawesome/free-brands-svg-icons";
import React from 'react'

function Nav() {
    const [notification, setNotification] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div>

            <Navbar className="nav-bar" expand="lg" >
                <Navbar.Brand style={{ fontSize: "1.8rem", textDecoration: "none" }} href="/" className="brandlogo">Blog</Navbar.Brand>
                <Container className="d-flex ml-auto justify-content-end" style={{ fontSize: "1rem", textDecoration: "none" }}>
                    <a href="https://www.linkedin.com/in/austine-gomez/"
                        className="linkedin social">
                        <FontAwesomeIcon icon={faLinkedin} size="3x" />
                    </a>
                    <a href="https://github.com/agomez99"
                        className="github social" id="git">
                        <FontAwesomeIcon icon={faGithub} size="3x" />
                    </a>
                    <div bg="grey-light" text="center" p="4" rounded="none">
                        {notification}
                        {!loggedIn
                            ?
                            <div>
                                {/* <Link href="/users/blogindex" legacyBehavior>
                <a style={{ float: "left",fontSize:"1.2rem", textDecoration:"none"  }}> Blogs</a>
              </Link> */}
                                <Link href="/users/login" legacyBehavior>
                                    <a style={{ paddingLeft: "100px", fontSize: "1.2rem", textDecoration: "none" }}> Login</a>
                                </Link>

                            </div>
                            :
                            <button onClick={handleLogout}>Logout</button>

                        }

                    </div>
                    <div bg="grey-light" text="center" p="4" rounded="none">
                        {notification}
                        {loggedIn
                            ?
                            <div>
                                <Link href="/users/blogindex" legacyBehavior>
                                    <a style={{ float: "left", fontSize: "1.4rem", textDecoration: "none" }}> Blogs</a>
                                </Link>
                                <Link href="/users/newblog" legacyBehavior>
                                    <a style={{ paddingLeft: "100px", float: "left", fontSize: "1.4rem", textDecoration: "none" }}> New blog</a>
                                </Link>
                            </div>
                            :
                            <>
                            </>
                        }
                    </div>
                </Container>

            </Navbar>



        </div>
    )
}

export default Nav