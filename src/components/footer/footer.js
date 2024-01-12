import { useEffect, useState } from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import { createBucketClient } from '@cosmicjs/sdk';

function Footer() {
    const [content, setContent] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            const cosmic = createBucketClient({
                bucketSlug: 'talk-bro-production',
                readKey: 'cv2tgszKnLkI3DNLtTqK2nRisfEtDatGzO81fcYJp3UBubBYLk',
            });
            try {
                const response = await cosmic.objects.find({
                type: 'contents',
                });
                console.log(response);
                setContent(response.objects);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchContent();
    }, []);

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
                    <Link to="https://www.instagram.com/talkbro.agency/">
                        <img src="img/insta_icon.svg" />
                    </Link>
                    {/*<Link to="https://www.tiktok.com/en/">{/*LINK PARA TIK TOK*
                        <img src="img/tiktok.png" />
                    </Link>
                    <Link to="https://www.whatsapp.com/">{/*LINK PARA WPP*
                        <img src="img/whatsapp.png" />
                    </Link>
                    <Link to="https://www.youtube.com/">{/*LINK PARA YOUTUBE*
                        <img src="img/youtube.png" />
                    </Link>*/}
                </div>
                <div class="logo">
                {content && content.map(item => {
                    if(item.title === 'logo_orange'){
                        return <img src={item.metadata.img.url}/>
                    }
                })
            }
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