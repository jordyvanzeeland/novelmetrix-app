import React, { useEffect, useRef, useState } from "react";
import moment from 'moment';
import '../../assets/style.css';
import 'flag-icon-css/css/flag-icons.min.css';
import "quill/dist/quill.snow.css";
import withAuth from "../../components/WithAuth";
import Sidebar from "../../components/Sidebar";
import { fetchApi } from "../../Functions";
import { NavLink, useParams } from "react-router-dom";
moment.locale('nl');

const Story = (props) => {
    const { storyid } = useParams();
    const [stories, setStories] = useState([]);
    const [currentStory, setCurrentStory] = useState([]);

    const getData = async() => {
        const getAllStories = await fetchApi('GET', 'write/stories');
        setStories(getAllStories);

        if(storyid){
            const getCurrentStory = await fetchApi('GET', `write/stories/${storyid}`);
            setCurrentStory(getCurrentStory);
        }
    }

    useEffect(() => {
        getData();
    }, [storyid])

    return (
        <React.Fragment>
            <Sidebar />

            <div className="content">
                <div className="sidebar_write">
                    <button className='btn btn-primary'><i class="fa-solid fa-plus"></i></button>
                    <span className="write_logo"><i style={{ color: "#405181" }} class="fa-solid fa-pencil"></i> NovelStudio</span>

                    <ul className="list_stories">
                        {stories.map(story => {
                            return (
                                <NavLink to={`/write/stories/${story.id}`} exact="true"><li>{story.name}</li></NavLink>
                            )
                        })}
                    </ul>
                </div>

                <div className="content_write">
                    <div className="row">
                        <div className="col-md-8">

                            {!storyid && (
                                <React.Fragment>
                                    <h1 style={{ margin: "30px 0" }}>Stories</h1>

                                    <div className="empty-stories">
                                    <img className="stories-arrow" src="/arrow-dashboard.png" />
                                    <span>Kies een verhaal om in te werken</span>
                                    </div>
                                </React.Fragment>

                            )}

                            {storyid && (
                                <React.Fragment>
                                    <button className='btn btn-green'><i class="fa-solid fa-check"></i></button>
                                    <button className='btn btn-red'><i className="fa-solid fa-trash-can"></i></button>
                                    <h1 style={{ margin: "30px 0" }}>{storyid ? (currentStory && currentStory.story ? currentStory.story.name : "Stories") : "Stories"}</h1>

                                    <div class="form-group">
                                        <label for="chapter_title">Naam</label>
                                        <input type="text" className="form-control" id="chapter_title" name="chapter_title" defaultValue={currentStory && currentStory.story ? currentStory.story.name : ''} style={{ marginBottom: "20px", marginTop: "10px" }}/>
                                    </div>

                                    <div class="form-group">
                                        <label for="chapter_title">Genre</label>
                                        <input type="text" className="form-control" id="chapter_title" name="chapter_title" defaultValue={currentStory && currentStory.story ? currentStory.story.genre : ''} style={{ marginBottom: "20px", marginTop: "10px" }}/>
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                        
                        <div className="col-md-4">
                            {storyid && (
                                <div className="chapters">
                                    <button className='btn btn-primary'><i class="fa-solid fa-plus"></i></button>
                                    <h3>Hoofdstukken</h3>
                                    <ul>
                                        {currentStory && currentStory.chapters ? currentStory.chapters.map(chapter => {
                                            return <NavLink to={`/write/stories/${props.router.storyid}/chapter/${chapter.id}`} exact="true"><li>{chapter.name}</li></NavLink>
                                        }) : ''}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </React.Fragment>
    )
}

export default withAuth(Story)