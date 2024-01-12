// Import necessary dependencies
import { createBucketClient } from "@cosmicjs/sdk";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./search_page.css";


function SearchPage() {
    window.scrollTo(0, 0);
    const [data, setData] = useState(null);
    const [filter, setFilter] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

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
                setData(response.objects);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, []);

    const handleFilterChange = (value) => {
        setFilter(value);
    };

    const handleTagToggle = (tag) => {
        setSelectedTags((prevTags) => {
            if (prevTags.includes(tag)) {
                return prevTags.filter((t) => t !== tag);
            } else {
                return [...prevTags, tag];
            }
        });
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        if (!data) return [];

        const sortableData = [...data];
        if (sortConfig.key) {
            sortableData.sort((a, b) => {
                const aValue = sortConfig.key === 'year' ? parseInt(a.metadata[sortConfig.key], 10) : a.metadata[sortConfig.key].toLowerCase();
                const bValue = sortConfig.key === 'year' ? parseInt(b.metadata[sortConfig.key], 10) : b.metadata[sortConfig.key].toLowerCase();

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return sortableData.filter(item => (
            (item.metadata.title.toLowerCase().includes(filter.toLowerCase()) ||
            item.metadata.author.toLowerCase().includes(filter.toLowerCase()) ||
            item.metadata.client.toLowerCase().includes(filter.toLowerCase())) &&
            (selectedTags.length === 0 || selectedTags.every(tag => item.metadata.tags.includes(tag)))
        ));
    }, [data, filter, selectedTags, sortConfig]);

//////////////////////////////////////////////// PAGINA SEARCH

    return (
        <div data-scroll-container>
            <div className="search-container">
                <div>
                    <label>SEARCH</label>
                    <input
                        className="search-input"
                        type="text"
                        value={filter}
                        onChange={(e) => handleFilterChange(e.target.value)}
                    />
                </div>
                <div>
                    <label>TAGS</label>
                    {['Vídeo','Comunicação','Design Gráfico','Press','Fotografia','Branding','Ilustração','Gestão de Projeto'].map(tag => 
                    (
                        <label key={tag} className="container">
                            <input
                                type="checkbox"
                                checked={selectedTags.includes(tag)}
                                onChange={() => handleTagToggle(tag)}
                            />
                            <span class="checkmark"></span>
                            {tag}
                        </label>
                    ))}
                </div>
            </div>
        <div className="table-container">
            <table className="search-table">
                <thead>
                    <tr className="header">
                        <th style={{ width: "30%" }} onClick={() => handleSort('title')}>
                            NOME {sortConfig.key === 'title' && (
                                sortConfig.direction === 'asc' ? '▲' : '▼'
                            )}
                        </th>
                        <th style={{ width: "20%" }}>TAGS</th>
                        <th style={{ width: "20%" }} onClick={() => handleSort('client')}>
                            CLIENTE {sortConfig.key === 'client' && (
                                sortConfig.direction === 'asc' ? '▲' : '▼'
                            )}
                        </th>
                        <th style={{ width: "20%" }} onClick={() => handleSort('author')}>
                            AUTOR {sortConfig.key === 'author' && (
                                sortConfig.direction === 'asc' ? '▲' : '▼'
                            )}
                        </th>
                        <th style={{ width: "10%" }} onClick={() => handleSort('year')}>
                            ANO {sortConfig.key === 'year' && (
                                sortConfig.direction === 'asc' ? '▲' : '▼'
                            )}
                        </th>
                    </tr>
                </thead>
                
                <tbody>
                    {sortedData.map((item) => (
                        <tr key={item._id}>
                            <td className="first-column">
                                <Link to='/talk-bro/work' state={item} className="work-link">
                                    {item.metadata.title}
                                </Link>
                            </td>
                            <td>{item.metadata.tags.join(", ")}</td>
                            <td>{item.metadata.client}</td>
                            <td>{item.metadata.author}</td>
                            <td>{item.metadata.year}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default SearchPage;
