import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import './work_page.css';
import { createBucketClient } from "@cosmicjs/sdk";

function WorkPage() {
    const { state } = useLocation();
    const [works, setWork] = useState(null);

    useEffect(() => {
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
            setWork(response.objects);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
        fetchWorks();
    }, []);

    const filteredWorks = works && works.filter(item => item.id !== state.id);
    console.log(filteredWorks);

    //////////////////////////////////////////////// PAGINA DETALHE TRABALHO
    return (
        <div>
            <div className="work-container">
                <div className="text">
                    <p className="title">{state.metadata.title}</p>
                    <p className="client">{state.metadata.client}</p>
                    <p className="year">{state.metadata.year}</p>
                </div>
                <div className="imagedescript">
                    <div className="image">
                    <img className="work-detail" src={state.metadata.img.url}/>
                        {state.metadata.extra_imgs.map((item) => (
                        <img src={item.extra_img.url} class="extra-img"/>
                        ))}
                    </div>
                    <div className="descript">
                    <p className="description"> {state.metadata.description}</p>
                    <p className="tags">{state.metadata.tags.join(' * ')}</p>
                    <p className="author">{state.metadata.author} </p>
                    </div>
                </div>
            </div>
            <div className="carousel-work">
                {filteredWorks && (
                    filteredWorks.map((item) => (
                        <div className="work-item" key={item._id}>
                            <Link to='/work' state={item}>
                                {<img className="work-img" src={item.metadata.img.url} alt={item.metadata.title} />}
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default WorkPage; 