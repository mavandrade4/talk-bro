import { createBucketClient } from "@cosmicjs/sdk";
import { useEffect, useState } from "react";
import "./team_page.css";
import { Link } from "react-router-dom";

function TeamPage() {
    const [works, setWork] = useState(null);
    const [team, setTeam] = useState(null);
    const [selectedMember, setMember] = useState(null);

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
        // TEAM MEMBERS
        const fetchTeam = async () => {
            const cosmic = createBucketClient({
                bucketSlug: 'talk-bro-production',
                readKey: 'cv2tgszKnLkI3DNLtTqK2nRisfEtDatGzO81fcYJp3UBubBYLk',
            });
            try {
                const response = await cosmic.objects.find({
                type: 'members',
                });
                console.log(response);
                setTeam(response.objects);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            };
        fetchWorks();
        fetchTeam();
    }, []);

    //////////////////////////////////////////////// PAGINA EQUIPA
    return (
        <div>
            <div class="info-container">
                <p class="page-title">QUERES FAZER PARTE DA NOSSA EQUIPA?</p>
                <p class="page-desc">A Talk Bro Agency é um coletivo de profissionais de comunicação e design que se quer tornar referência a nivel nacional e internacional. Apresentamos estratégias que estabelecem laços fortes entre consumidor e marca, baseadas em quatro pilares: pesquisa, planeamento, aplicação e resultados.</p>
            </div>
            <div class="carousel-team">
            {team && (
                    team.map((member) => (
                    <div
                        key={member.id}
                        className={`team-item ${selectedMember && selectedMember.id === member.id ? 'selected' : ''}`}
                        onClick={() => setMember(member)}
                    >
                        <img
                            className="team-img"
                            src={member.metadata.img.url}
                            alt={member.metadata.name}
                        />
                    </div>
                    ))
                )
            }
            </div>
                { selectedMember && (
                <div class="member-detail">
                    <div>
                        <p class="detail-name">{selectedMember.metadata.name}</p>
                        <p class="detail-tag">{selectedMember.metadata.tags.join(" * ")}</p>
                        <p class="detail-bio">{selectedMember.metadata.bio}</p>
                    </div>
                </div>
            ) }
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

export default TeamPage;