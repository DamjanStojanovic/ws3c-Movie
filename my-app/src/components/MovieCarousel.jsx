import React, { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS library
import '../styles/MovieCarousel.css';
import { Link } from "react-router-dom";

/*
  This component is a carousel that displays a list of movies.
  The movies are passed as props to the component.
  The component uses the react-multi-carousel library to create the carousel.
  See the documentation here: https://react-multi-carousel.surge.sh/
 */

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 2
  }
};

const MovieCarousel = ({ title, movies }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in milliseconds
      once: true, // whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
      <div className="movie-carousel-wrapper">
        <h2>{title}</h2>
        <div className="movie-carousel glassmorphism-effect">
          <Carousel responsive={responsive}
                    slidesToSlide={responsive.slidesToSlide}
                    autoPlay
                    autoPlaySpeed={5000}
                    pauseOnHover
                    rewind={true}
                    rewindWithAnimation={true}
                    swipeable
                    centerMode={true}
          >
            {movies.map(movie => (
                <div className="movie-card" key={movie.id} data-aos="fade-up">
                  <Link to={`/movie/${movie.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                    <h3>{movie.title}</h3>
                  </Link>
                </div>
            ))}
          </Carousel>
        </div>
      </div>
  );
};

export default MovieCarousel;
