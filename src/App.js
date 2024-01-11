import React, { useState, useEffect } from 'react';
import { createBucketClient } from '@cosmicjs/sdk';
import './App.css'
import { Link } from 'react-router-dom';
//import LocomotiveScroll from 'locomotive-scroll';

function App() {
  const [data, setData] = useState(null);
  const [intros, setIntrosData] = useState(null);

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
    /*
    const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
    });
    return () => {
      scroll.destroy();
    };
    */
  
    const fetchIntros = async () => {
      window.scrollTo(0, 0);
      const cosmic = createBucketClient({
        bucketSlug: 'talk-bro-production',
        readKey: 'cv2tgszKnLkI3DNLtTqK2nRisfEtDatGzO81fcYJp3UBubBYLk',
      });
      try {
        const response = await cosmic.objects.find({
          type: 'intros',
        });
        setIntrosData(response.objects);
      } catch (error) {
        console.error('Error fetching intros data:', error);
      }
    };


  fetchWorks();
  fetchIntros();


  }, []);

//////////////////////////////////////////////// PAGINA TRABALHOS (HOME)

  return (
    <div data-scroll-container>
      <div class="hero-container">
        <img src="img/hero.gif" class='videoH'/>
        {/*<img class="overlay-logo" src="img/logo_y.svg"/>*/}
      </div>
      <div class="intro">
        <p>
        {intros &&
          intros
           .filter((intro) => intro.title === 'Descrição Home Page')
           .map((intro) => intro.metafields && intro.metafields.textos)}
          </p>
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

