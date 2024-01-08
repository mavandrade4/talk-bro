import './footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="footer" id="footer">
            <div class="call-to-action">
                <p>LET'S<span></span>TOGETHER!</p>
            </div>
            <div class="email">
                <a href="mailto:TALKBROAGENCY@GMAIL.COM" target="_blank" rel="noopener noreferrer">
                    <p class="stroke">* TALKBROAGENCY@GMAIL.COM</p><p> * TALKBROAGENCY@GMAIL.COM</p><p class="stroke"> * TALKBROAGENCY@GMAIL.COM</p><p> * TALKBROAGENCY@GMAIL.COM</p>
                </a>
            </div>

            <div className="footer-links">
                <div class="social">
                    <Link to="https://www.instagram.com/talkbro.agency/"> {/*LINK PARA INSTA*/}
                        <img src="img/insta_icon.svg" />
                    </Link>
                    {/*<Link to="https://www.tiktok.com/en/">{/*LINK PARA TIK TOK*
                        <img src="img/tiktok.png" />
                    </Link>
                    <Link to="https://www.whatsapp.com/">{/*LINK PARA WPP*
                        <img src="img/whatsapp.png" />
                    </Link>
                    <Link to="https://www.youtube.com/">{/*LINK PARA YOUTUBE
                        <img src="img/youtube.png" />
                    </Link>*/}
                </div>

                <div class="logo">
                    <img src="img/logo_y.svg" />
                    <p>2023, TALKBROAGENCY.</p>
                </div>

                <div class="pages">
                    <Link to="/talk-bro/team">SOBRE NÓS</Link>
                    <Link to="/talk-bro/">TRABALHOS</Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;