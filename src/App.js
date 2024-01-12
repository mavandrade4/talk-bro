import React, { useState, useEffect } from 'react';
import { createBucketClient } from '@cosmicjs/sdk';
import './App.css'
import { Link } from 'react-router-dom';
//import LocomotiveScroll from 'locomotive-scroll';

function App() {
  const [data, setData] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchWorks = async () => {
      window.scrollTo(0, 0);
      const cosmic = createBucketClient({
        bucketSlug: 'talk-bro-production',
        readKey: 'cv2tgszKnLkI3DNLtTqK2nRisfEtDatGzO81fcYJp3UBubBYLk',
      });
      try {
        const response = await cosmic.objects.find({
          type: 'works',
        });
        setData(response.objects);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
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
  
  /*
  const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
  });
  return () => {
    scroll.destroy();
  };
  */
    fetchContent();
    fetchWorks();
  }, []);

//////////////////////////////////////////////// PAGINA TRABALHOS (HOME)

  return (
    <div data-scroll-container>
      <div class="hero-container">
        {content && content.map(item => {
        if(item.title === 'hero_vid'){
            return <img src={item.metadata.img.url} class='videoH'/> 
          }
        })
      }
      </div>
      <div class="intro">
      {content && content.map(item => {
        if(item.title === 'descHomePage'){
            return <p>{item.metadata.text}</p> 
          }
        })
      }
      </div>
      <div className="image-grid" id="image-grid">
          {data ? (
            data.map((item) => (
              <div className="image-item" key={item._id}>
                <Link to='/talk-bro/work' state={item}>
                  <div class="work-in-grid-container">
                    <img class="work-in-grid" src={item.metadata.img.url} />
                    <div className="overlay-text">{item.metadata.title}</div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
      </div>
    </div>
  );
}


export default App;

