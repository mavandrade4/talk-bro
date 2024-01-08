import React, { useState, useEffect } from 'react';
import { createBucketClient } from '@cosmicjs/sdk';
import './App.css'
import { Link } from 'react-router-dom';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchWorks = async () => {
      const cosmic = createBucketClient({
        bucketSlug: 'talk-bro-production',
        readKey: 'cv2tgszKnLkI3DNLtTqK2nRisfEtDatGzO81fcYJp3UBubBYLk',
      });
      try {
        const response = await cosmic.objects.find({
          type: 'works',
        });
        console.log(response);
        setData(response.objects);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchWorks();
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
          A Talk Bro Agency é um coletivo de profissionais de comunicação e design que se quer tornar referência a nivel nacional e internacional. Apresentamos estratégias que estabelecem laços fortes entre consumidor e marca, baseadas em quatro pilares: pesquisa, planeamento, aplicação e resultados.
        </p>
      </div>
      <div className="image-grid">
          {data ? (
            data.map((item) => (
              <div className="image-item" key={item._id}>
                <Link to='/talk-bro/work' state={item}>
                  <img class="work-in-grid" src={item.metadata.img.url} />
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