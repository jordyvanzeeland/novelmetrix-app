import React, { useEffect, useRef, useState } from "react";
import moment from 'moment';
import '../../assets/style.css';
import 'flag-icon-css/css/flag-icons.min.css';
import "quill/dist/quill.snow.css";
import withAuth from "../../components/WithAuth";
import Sidebar from "../../components/Sidebar";
import { fetchApi } from "../../Functions";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Quill from 'quill';
moment.locale('nl');

const Chapter = (props) => {
    const navigate = useNavigate();
    const { storyid, chapterid } = useParams();
    const [stories, setStories] = useState([]);
    const [currentStory, setCurrentStory] = useState([]);
    const [currentChapter, setCurrentChapter] = useState([]);
    const editorRef = useRef(null);
    const quillRef = useRef();

    const addChapter = async(event) => {
        event.preventDefault();
        let data = '';

        console.log(currentChapter);

        if(chapterid){
            data = await fetchApi('PUT', `write/stories/${storyid}/chapter/${chapterid}/update`, null, {
                'storyid': storyid,
                'name': event.target.chapter_title.value,
                'content': quillRef.current.root.innerHTML
            });

            await getData();
        }else{
            data = await fetchApi('POST', `write/stories/${storyid}/chapters/insert`, null, {
                'storyid': storyid,
                'name': event.target.chapter_title.value,
                'content': quillRef.current.root.innerHTML
            });

            navigate(`/write/story/${storyid}/chapter/${data.newchapter.id}`);
        }
    }

    const deleteChapter = async () => {
        await fetchApi('DELETE', `write/stories/${storyid}/chapter/${chapterid}/delete`);
        navigate(`write/stories/${storyid}`);
    }

    const getData = async() => {
        const getAllStories = await fetchApi('GET', 'write/stories');
        setStories(getAllStories);

        if(storyid){
            const getCurrentStory = await fetchApi('GET', `write/stories/${storyid}`);

            if(chapterid){
                const getCurrentChapter = getCurrentStory.chapters.filter(chapter => chapter.id === parseInt(chapterid));
                setCurrentChapter(getCurrentChapter[0]);
            }
            
            setCurrentStory(getCurrentStory);
        }
    }

    useEffect(() => {
        getData();

        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
              theme: "snow",
            });
          }

    }, [storyid, chapterid])

    useEffect(() => {
        if (quillRef.current && currentChapter?.content) {
          quillRef.current.root.innerHTML = currentChapter.content;
        }
      }, [currentChapter]);

    return (
        <React.Fragment>
            <Sidebar />

            <div className="content">
                <div className="sidebar_write">
                    <button className='btn btn-primary' onClick={() => navigate('/write/stories/new')}><i class="fa-solid fa-plus"></i></button>
                    <span className="write_logo"><i style={{ color: "#405181" }} class="fa-solid fa-pencil"></i> NovelStudio</span>

                    <ul className="list_stories">
                        {stories.map(story => {
                            return (
                                <NavLink to={`/write/story/${story.id}`} exact="true"><li>{story.name}</li></NavLink>
                            )
                        })}
                    </ul>
                </div>

                <div className="content_write">
                    <div className="row">
                        <div className="col-md-8">
                            <button className='btn btn-red' onClick={() => deleteChapter()}><i className="fa-solid fa-trash-can"></i> Verwijderen</button>
                            <form method="POST" onSubmit={(event) => addChapter(event)}>
                                <button type="submit" className='btn btn-green'><i class="fa-solid fa-check"></i> Opslaan</button>
                                <h1 style={{ marginTop: "30px" }}>{storyid ? (currentStory && currentStory.story ? currentStory.story.name : "Stories") : "Stories"}</h1>
                                <input type="text" className="form-control" id="chapter_title" name="chapter_title" defaultValue={currentChapter ? currentChapter.name : ''} style={{ marginBottom: "20px", marginTop: "10px" }}/>
                                <div ref={editorRef} style={{ height: "500px", background: "#ffffff" }}></div>
                            </form>
                        </div>
                        <div className="col-md-4">
                            <div className="chapters">
                                <button className='btn btn-primary'><i class="fa-solid fa-plus"></i></button>
                                <h3>Hoofdstukken</h3>
                                <ul>
                                    {currentStory && currentStory.chapters ? currentStory.chapters.map(chapter => {
                                        return <NavLink to={`/write/story/${props.router.storyid}/chapter/${chapter.id}`} exact="true"><li>{chapter.name}</li></NavLink>
                                    }) : ''}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </React.Fragment>
    )
}

export default withAuth(Chapter)