import { createBucketClient } from "@cosmicjs/sdk";
import { useEffect, useState } from "react";
import "./team_page.css";
import { Link } from "react-router-dom";
import 'animate.css';

function TeamPage() {
    const [works, setWork] = useState(null);
    const [team, setTeam] = useState(null);
    const [selectedMember, setMember] = useState(null);
    const [content, setContent] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
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
                setTeam(response.objects);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchContent = async () => {
            const cosmic = createBucketClient({
                bucketSlug: 'talk-bro-production',
                readKey: 'cv2tgszKnLkI3DNLtTqK2nRisfEtDatGzO81fcYJp3UBubBYLk',
            });
            try {
                const response = await cosmic.objects.find({
                type: 'contents',
                });
                console.log(response);
                setContent(response.objects);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchWorks();
        fetchTeam();
        fetchContent();
    }, []);

    function handleTeamMemberClick(member) {
        if (selectedMember && selectedMember.id === member.id) {
            setMember(null);
        } else {
            setMember(member);
        }
    }

    //////////////////////////////////////////////// PAGINA EQUIPA
    return (
        <div data-scroll-container>
            <div class="info-container">
            {content && content.map(item => {
                    if(item.title === 'titleTeamPage'){
                        return <p class="page-title">{item.metadata.text}</p> 
                    }
                })
            }
            {content && content.map(item => {
                    if(item.title === 'descTeamPage'){
                        return <p class="page-desc">{item.metadata.text}</p> 
                    }
                })
            }
            </div>
            <div class="carousel-team">
            {team && (
                    team.map((member) => (
                    <div
                        key={member.id}
                        className={`team-item ${selectedMember && selectedMember.id === member.id ? 'selected' : ''}`}
                        onClick={() => handleTeamMemberClick(member)}
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
                    <div class="bio-members">
                        <p class="detail-name">{selectedMember.metadata.name}</p>
                        <p class="detail-tag">{selectedMember.metadata.tags.join(" * ")}</p>
                        <p class="detail-bio">{selectedMember.metadata.bio}</p>
                    </div>
                </div>
            ) }
            <div class="info-container">
                <p class="page-title">OS NOSSOS TRABALHOS</p>
            </div>
            <div className="carousel-work">
            {works && (
                    works.map((item) => ( 
                    <div className="work-item">
                        <Link to='/talk-bro/work' state={item}>
                            {<img class="work-img" src={item.metadata.img.url} />}
                            <div className="overlay-text-work">{item.metadata.title}</div>
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