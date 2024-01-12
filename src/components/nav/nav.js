import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import { createBucketClient } from '@cosmicjs/sdk';

const NavBar = () => {  
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
      <nav className="navbar">
        <div className="navbar-links">
          <Link to="/talk-bro/">
            {content && content.map(item => {
                    if(item.title === 'logo_black'){
                        return <img src={item.metadata.img.url} class="navbar-img"/>
                    }
                })
            }
          </Link>
          <Link to="/talk-bro/#image-grid">TRABALHOS</Link>
          <Link to="/talk-bro/team">SOBRE NÓS</Link>
          <Link to="/talk-bro/search">PESQUISA</Link>
          <a href="#footer">CONTACTOS</a>
        </div>
      </nav>
    );
};

export default NavBar;