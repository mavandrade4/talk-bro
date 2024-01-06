import { useLocation } from "react-router-dom";
import './work_page.css';

function WorkPage() {
    const { state } = useLocation();

    //////////////////////////////////////////////// PAGINA DETALHE TRABALHO
    return (
        <div>
            <p className="work_title">{state.metadata.title}</p>
            <p className="work_client">{state.metadata.client}</p>
            <p className="work_info">{state.metadata.info}</p>
            <img className="work_detail" src={state.metadata.img.url}/>
            <p>{state.metadata.autor}</p>
        </div>
    );
}

export default WorkPage; 