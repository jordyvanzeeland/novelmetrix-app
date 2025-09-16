import React, { useEffect, useRef, useState } from "react";
import moment from 'moment';
import '../../assets/style.css';
import 'flag-icon-css/css/flag-icons.min.css';
import "quill/dist/quill.snow.css";
import withAuth from "../../components/WithAuth";
import Sidebar from "../../components/Sidebar";
import { fetchApi } from "../../Functions";
import { NavLink, useNavigate, useParams } from "react-router-dom";
moment.locale('nl');

const Story = (props) => {
    const navigate = useNavigate();
    const { storyid } = useParams();
    const [stories, setStories] = useState([]);
    const [currentStory, setCurrentStory] = useState([]);

    const addStory = async(event) => {
        event.preventDefault();

        const data = await fetchApi('POST', `write/stories/insert`, null, {
            'name': event.target.name.value,
            'genre': event.target.genre.value
        });

        navigate(`/write/story/${data.newbook.id}`);
    }

    const deleteStory = async () => {
        await fetchApi('DELETE', `write/stories/${storyid}/delete`);
        navigate('/write/stories');
    }

    const getData = async() => {
        const getAllStories = await fetchApi('GET', 'write/stories');
        setStories(getAllStories);
        setCurrentStory([]);

        if(storyid){
            const getCurrentStory = await fetchApi('GET', `write/stories/${storyid}`);
            setCurrentStory(getCurrentStory);
        }
    }

    useEffect(() => {
        getData();
    }, [storyid, props])

    return (
        <React.Fragment>
            <Sidebar />

            <div className="content">
                <div className="sidebar_write">
                    <button className='btn btn-primary' onClick={() => navigate('/write/stories/new')}><i className="fa-solid fa-plus"></i></button>
                    <span className="write_logo"><i style={{ color: "#405181" }} className="fa-solid fa-pencil"></i> NovelStudio</span>

                    <ul className="list_stories">
                        {stories.length === 0 && (<li>Geen verhalen om weer te geven</li>)}

                        {stories.map((story, i) => {
                            return (
                                <NavLink key={i} to={`/write/story/${story.id}`} exact="true"><li>{story.name}</li></NavLink>
                            )
                        })}
                    </ul>
                </div>

                <div className="content_write">
                    <div className="row">
                        <div className="col-md-8">

                            {!storyid && !props.new && (
                                <React.Fragment>
                                    <h1 style={{ margin: "30px 0" }}>Stories</h1>

                                    <div className="empty-stories">
                                    <img className="stories-arrow" src="/arrow-dashboard.png" />
                                    <span>Kies een verhaal om in te werken</span>
                                    </div>
                                </React.Fragment>

                            )}

                            {storyid || props.new ?
                                <React.Fragment>
                                    <button className='btn btn-red' onClick={() => deleteStory()}><i className="fa-solid fa-trash-can"></i> Verwijderen</button>
                                    <form method="POST" onSubmit={(event) => addStory(event)}>
                                        <button type="submit" className='btn btn-green'><i className="fa-solid fa-check"></i> Opslaan</button>
                                        
                                        <h1 style={{ margin: "30px 0" }}>{storyid ? (currentStory && currentStory.story ? currentStory.story.name : "Stories") : "Stories"}</h1>

                                        <div className="form-group">
                                            <label htmlFor="chapter_title">Naam</label>
                                            <input type="text" className="form-control" id="name" name="name" defaultValue={currentStory && currentStory.story ? currentStory.story.name : ''} style={{ marginBottom: "20px", marginTop: "10px" }}/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="chapter_title">Genre</label>
                                            <input type="text" className="form-control" id="genre" name="genre" defaultValue={currentStory && currentStory.story ? currentStory.story.genre : ''} style={{ marginBottom: "20px", marginTop: "10px" }}/>
                                        </div>
                                    </form>
                                </React.Fragment>
                            : ''}
                        </div>

                        <div className="col-md-4">
                            {storyid || props.new ?
                                <div className="chapters">
                                    <button className='btn btn-primary' onClick={() => navigate(`/write/story/${storyid}/chapter/new`)}><i className="fa-solid fa-plus"></i></button>
                                    <h3>Hoofdstukken</h3>
                                    <ul>
                                        {currentStory && currentStory.chapters && currentStory.chapters.length === 0 && (<li>Geen hoofdstukken om weer te geven</li>)}

                                        {currentStory && currentStory.chapters ? currentStory.chapters.map((chapter, i) => {
                                            return <NavLink key={i} to={`/write/story/${props.router.storyid}/chapter/${chapter.id}`} exact="true"><li>{chapter.name}</li></NavLink>
                                        }) : ''}
                                    </ul>
                                </div>
                            : ''}
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </React.Fragment>
    )
}

export default withAuth(Story)