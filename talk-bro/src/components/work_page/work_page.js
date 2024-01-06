import { useLocation } from "react-router-dom";
import './work_page.css';

function WorkPage() {
    const { state } = useLocation();
    console.log(state.metadata.extra_imgs);
    //////////////////////////////////////////////// PAGINA DETALHE TRABALHO
    return (
        <div>
            <p>{state.metadata.title}</p>
            <p>{state.metadata.client}</p>
            <p>{state.metadata.description}</p>
            <img className="work_detail" src={state.metadata.img.url}/>
            {/*state.metadata.extra_imgs.map((extra_img) => (
                <div>
                    <img key={extra_img.id} src={extra_img.url} className="extra_img"/>
                </div>
            ))*/}
            <p>{state.metadata.author}</p>
            <p>{state.metadata.year}</p>
            <p>{state.metadata.tags.join(',')}</p>
        </div>
    );
}

export default WorkPage;