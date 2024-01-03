import { createBucketClient } from "@cosmicjs/sdk";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./search_page.css";

function SearchPage() {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
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
        fetchData();
    }, []);

    //////////////////////////////////////////////// PAGINA SEARCH
    return (
        <table class="search-table">
          <tr class="header">
            <th style={{width:"20%"}}>NOME</th>
            <th style={{width:"20%"}}>TAGS</th>
            <th style={{width:"20%"}}>CLIENTE</th>
            <th style={{width:"20%"}}>AUTOR</th>
            <th style={{width:"30%"}}>ANO</th>
          </tr>
          {data && (
              data.map((item) => (
                <tr>
                    <Link to='/work' state={item}>
                        <td>{item.metadata.title}</td>
                    </Link>
                        <td>{item.metadata.tags.join(", ")}</td>
                        <td>{item.metadata.client}</td>
                        <td>{item.metadata.author}</td>
                        <td>{item.metadata.year}</td>
                </tr>
            ))
          )}
        </table>
    );
}

export default SearchPage;