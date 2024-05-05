import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";

const TitleCards = ({ title, category }) => {
    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmU0NzQzYjhkODAyNzQwYTUyZGM1MDFkZDdlYTNkNCIsInN1YiI6IjY2MzY1NDZlNjY1NjVhMDEyODE1NGE1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k0ivlWbGAEnqOMT6EvuTkjeFzLSsPaDP2k6C-oN8XHk",
        },
    };

    const handleWheel = (event) => {
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    };

    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${
                category ? category : "now_playing"
            }?language=en-US&page=1`,
            options
        )
            .then((response) => response.json())
            .then((response) => setApiData(response.results))
            .catch((err) => console.error(err));

        cardsRef.current.addEventListener("wheel", handleWheel);
    }, []);

    return (
        <div className="title-cards">
            <h2>{title ? title : "Popular on Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return (
                        <Link
                            to={`/player/${card.id}`}
                            className="card"
                            key={index}
                        >
                            <img
                                src={
                                    `https://image.tmdb.org/t/p/w500` +
                                    card.backdrop_path
                                }
                                alt=""
                            />
                            <p>{card.original_title}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default TitleCards;
