import React from 'react';
import debounce from 'lodash.debounce';
import { Tabs } from 'antd';
import SearchPanel from '../SearchPanel';
import CardList from '../CardList';
import MovieService from '../../services/MovieService';
import LoadingIndicator from '../LoadingIndicator';
import ErrorIndicator from '../ErrorIndicator';
import posterNull from './no-poster-available.jpg';
import OfflineError from '../OfflineError';
import PaginationFilm from '../PaginationFilm';

import './App.css';

class App extends React.Component {
  movies = new MovieService();

  questSession = new MovieService();

  ratedFilm = new MovieService();

  constructor() {
    super();
    this.state = {
      films: [],
      ratedFilm: [],
      loading: false,
      error: false,
      searchFilm: '',
      pageSize: 20,
      totalResults: 0,
      totalPages: 0,
      hasError: false,
    };
  }

  componentDidMount() {
    this.movieDisplay = (search, page) => {
      this.movies
        .getMovies(search, page)
        .then((film) => {
          console.log(film);
          this.setState({
            films: film.results,
            totalResults: film.total_results,
            totalPages: film.total_pages,
            loading: false,
          });
        })
        .catch(() => {
          if (navigator.onLine) {
            this.setState(() => ({
              error: true,
              loading: false,
            }));
          }
        });
    };
    this.questSession.getQuestSession().then((sessionId) => {
      console.log(sessionId.guest_session_id);
      this.ratedFilm.ratedFilm(sessionId.guest_session_id).then((rated) => {
        console.log(rated);
        //   this.setState({
        //     ratedFilm: rated.results,
        //   });
      });
    });
  }

  componentDidCatch() {
    console.log('componentDidCatch()');
    this.setState({ hasError: true });
  }

  onSearchFilm = debounce((event) => {
    this.handlePageClick = (pageNumber) => {
      this.movieDisplay(event, pageNumber);
    };
    this.movieDisplay(event);
    this.setState(() => ({
      loading: true,
    }));
  }, 500);

  createPoster(poster) {
    return poster === null
      ? `${posterNull}`
      : `https://image.tmdb.org/t/p/w500/${poster}`;
  }

  //   callback = (key) => {
  //     console.log(key);
  //   };

  render() {
    const {
      films,
      loading,
      error,
      searchFilm,
      totalResults,
      // pagesCount,
      pageSize,
      totalPages,
      hasError,
      // questSession,
      ratedFilm,
    } = this.state;
    console.log(ratedFilm);
    const { TabPane } = Tabs;

    if (hasError) {
      return <ErrorIndicator />;
    }
    const errorMessage = error ? <ErrorIndicator /> : null;

    const loadingIndicator =
      loading && navigator.onLine ? <LoadingIndicator /> : null;

    const content = !(loading || error) ? (
      <CardList films={films} createPoster={this.createPoster} />
    ) : null;

    const offline = !navigator.onLine ? <OfflineError /> : null;

    const pagination =
      totalPages > 1 && content ? (
        <PaginationFilm
          handlePageClick={this.handlePageClick}
          totalCount={totalResults}
          pageSize={pageSize}
        />
      ) : null;

    return (
      <div>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Search" key="1">
            <div className="wrapper">
              <SearchPanel
                searchFilm={searchFilm}
                onSearchFilm={this.onSearchFilm}
              />
              {pagination}
              {errorMessage}
              {loadingIndicator}
              {content}
              {offline}
            </div>
          </TabPane>
          <TabPane tab="Rated" key="2">
            <div className="wrapper">
              {pagination}
              {content}
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
