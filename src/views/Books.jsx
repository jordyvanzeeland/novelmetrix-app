import React, { useState, useEffect } from "react";
import moment from 'moment';
import withAuth from "../components/WithAuth";
import Sidebar from "../components/Sidebar";
import { fetchApi } from "../Functions";
moment.locale('nl');

const Books = () => {
    const currentyear = new Date().getFullYear();
    const [year, setYear] = useState(currentyear);
    const [readingYears, setReadingYears] = useState([]);
    const [books, setBooks] = useState([]);

    const getData = async () => {
        const getYears = await fetchApi('GET', 'years');
        const getBooksOfYear = await fetchApi('GET', `books/${year}`);
        setReadingYears(getYears);
        setBooks(getBooksOfYear);
    }

    const changeYear = (event) => {
        // for (var item of event.target.parentNode.children) {
        //     item.classList.remove('current');
        // }
        
        // event.target.classList.add('current')
        setYear(event.target.textContent);
    }

    const bookRating = (rating) => {
        return (
            <div className="flex">
              {Array.from({ length: rating }, (_, i) => (
                <i key={i} className="fa-solid fa-star text-yellow-500"></i>
              ))}
            </div>
        );
    }

    useEffect(() => {
        getData();
      }, [year]);

    return (
        <React.Fragment>
            <Sidebar />
    
            <div className="content">
                <div class="readingyears">
                    <ul>
                        {readingYears.map(data => {
                            return <li onClick={(event) => changeYear(event)} className={data.year === year ? "yearbtn current" : 'yearbtn'}>{data.year}</li>
                        })}
                    </ul>
                </div>

                <div class="bookslist">
                    <button class="btn btn-green add-book"><i class="fa-solid fa-plus"></i> Toevoegen</button>
                    <h3>Gelezen boeken</h3>
                    <table id="DataTable" class="display" width="100%">
                        <thead>
                            <tr>
                                <th>Boek</th>
                                <th>Schrijver</th>
                                <th>Genre</th>
                                <th>Gelezen</th>
                                <th>Rating</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="table-content">
                            {books.map(book => {
                                return (
                                    <React.Fragment>
                                        <tr>
                                            <td>{book.name}</td>
                                            <td>{book.author}</td>
                                            <td><div class="catColor" style={{ background: book.genre === 'Thriller' ? "rgb(62,69,113)" : (book.genre === "Roman" ? "rgb(16, 115, 95)" : (book.genre === "Non-fictie" ? "rgb(220,116,105)" : "rgb(146,48,67)")) }}>{book.genre}</div></td>
                                            <td>{book.readed}</td>
                                            <td><td class="rating">{bookRating(book.rating)}</td></td>
                                        </tr>
                                    </React.Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {console.log(books)}
            </div>
        </React.Fragment>
    )
}

export default withAuth(Books)