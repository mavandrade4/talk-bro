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

    //////////////////////////////////////////////// PAGINA DETALHE TRABALHO
    return (
        <div className="work_container">
            
            <div className="text">
                <p className="title">{state.metadata.title}</p>
                <p className="client">{state.metadata.client}</p>
                <p className="year">{state.metadata.year}</p>
            </div>
            <div className="imagedescript">
                <div className="image">
                    <img className="work_detail" src={state.metadata.img.url}/>
                    {state.metadata.extra_imgs.map((item) => (
                    <img src={item.extra_img.url} class="extra_img"/>
                    ))}
                </div>
                <div className="descript">
                    <p className="description"> {state.metadata.description}</p>
                    <p className="tags">{state.metadata.tags.join(' * ')}</p>
                    <p className="author">{state.metadata.author} </p>
                </div>
            </div>
            <div className="carousel-work">
            {works && (
                    works.map((item) => ( 
                    <div className="work-item">
                        <Link to='/work' state={item}>
                            {<img class="work-img" src={item.metadata.img.url} />}
                        </Link>
                    </div>
                    ))
                )
            }
            </div>
        </div>
    );
}

export default WorkPage; 