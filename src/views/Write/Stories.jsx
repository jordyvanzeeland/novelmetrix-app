import React, { useEffect, useState } from "react";
import moment from 'moment';
import '../../assets/style.css';
import 'flag-icon-css/css/flag-icons.min.css';
import withAuth from "../../components/WithAuth";
import Sidebar from "../../components/Sidebar";
import { fetchApi } from "../../Functions";
import { NavLink } from "react-router-dom";
moment.locale('nl');

const Stories = (props) => {
    const [stories, setStories] = useState([]);
    const [currentStory, setCurrentStory] = useState([]);

    const currentStoryID = props.router.storyid ? props.router.storyid : "";

    const getData = async() => {
        const getAllStories = await fetchApi('GET', 'write/stories');
        setStories(getAllStories);

        if(currentStoryID){
            const getCurrentStory = await fetchApi('GET', `write/stories/${currentStoryID}`);
            setCurrentStory(getCurrentStory);
        }
    }

    useEffect(() => {
        getData();
    }, [currentStoryID])

    return (
        <React.Fragment>
            <Sidebar />

            <div className="content">

                <div className="sidebar_write">
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
                    <h1>{currentStoryID ? currentStory.name : "Stories"}</h1>
                </div>
                
            </div>
        </React.Fragment>
    )
}

export default withAuth(Stories)