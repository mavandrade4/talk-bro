import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import './work_page.css';
import { createBucketClient } from "@cosmicjs/sdk";

function WorkPage() {
    const { state } = useLocation();
    const [filteredWorks, setWorks] = useState(null);
    const [work] = useState(state);

    useEffect(() => {
        window.scrollTo(0, 0);
        // WORKS
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
            setWorks(response.objects.filter(item => item.id !== state.id));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
        fetchWorks();
    },  []);
    //////////////////////////////////////////////// PAGINA DETALHE TRABALHO
    return (
        <div data-scroll-container>
            <div className="work-container">
                <div className="text">
                    <p className="title">{work.metadata.title}</p>
                    <p className="client">{work.metadata.client}</p>
                    <p className="year">{work.metadata.year}</p>
                </div>
                <div className="imagedescript">
                    <div className="image">
                    <img className="work-detail" src={work.metadata.img.url}/>
                        {work.metadata.extra_imgs.map((item) => (
                        <img src={item.extra_img.url} class="extra-img"/>
                        ))}
                    </div>
                    <div className="descript">
                    <p className="description"> {work.metadata.description}</p>
                    <p className="tags">{work.metadata.tags.join(' * ')}</p>
                    <p className="author">{work.metadata.author} </p>
                    </div>
                </div>
            </div>
            <div className="carousel-work">
                {filteredWorks && (
                    filteredWorks.map((item) => (
                        <div className="work-item" key={item.id}>
                            <Link to='/talk-bro/work' work={item}>
                                {<img className="work-img" src={item.metadata.img.url} alt={item.metadata.title} />}
                                <div className="overlay-text-work">{item.metadata.title}</div>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default WorkPage; 