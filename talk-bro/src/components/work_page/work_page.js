import { useLocation } from "react-router-dom";
import './work_page.css';

function WorkPage() {
    const { state } = useLocation();
    console.log(state.metadata.extra_imgs);
    //////////////////////////////////////////////// PAGINA DETALHE TRABALHO
    return (
        <div>
<<<<<<< HEAD
            <p className="work_title">{state.metadata.title}</p>
            <p className="work_client">{state.metadata.client}</p>
            <p className="work_info">{state.metadata.info}</p>
            <img className="work_detail" src={state.metadata.img.url}/>
            <p>{state.metadata.autor}</p>
=======
            <p>{state.metadata.title}</p>
            <p>{state.metadata.client}</p>
            <p>{state.metadata.description}</p>
            <img className="work_detail" src={state.metadata.img.url}/>
            <div class="extra-imgs">
            {state.metadata.extra_imgs.map((item) => (
                <img src={item.extra_img.url} class="extra_img"/>
            ))}
            </div>
            <p>{state.metadata.author}</p>
            <p>{state.metadata.year}</p>
            <p>{state.metadata.tags.join(',')}</p>
>>>>>>> 324d46cf659afc4fc349bd1a3f31072db1e89516
        </div>
    );
}

export default WorkPage; 