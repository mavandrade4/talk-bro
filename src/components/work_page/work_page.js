import { useLocation } from "react-router-dom";
import './work_page.css';

function WorkPage() {
    const { state } = useLocation();
    console.log(state.metadata.extra_imgs);
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
        </div>
    );
}

export default WorkPage; 