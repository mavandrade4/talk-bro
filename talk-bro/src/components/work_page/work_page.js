import { useLocation } from "react-router-dom";
import './work_page.css';

function WorkPage() {
    const { state } = useLocation();

    //////////////////////////////////////////////// PAGINA DETALHE TRABALHO
    return (
        <div>
            <p>{state.metadata.title}</p>
            <p>{state.metadata.client}</p>
            <p>{state.metadata.info}</p>
            <img class="work_detail" src={state.metadata.img.url}/>
            <p>{state.metadata.autor}</p>
        </div>
    );
}

export default WorkPage;