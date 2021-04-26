/* eslint-disable react/sort-comp */
import React from 'react';
import debounce from 'lodash.debounce';
import { Tabs } from 'antd';
import SearchPanel from '../SearchPanel';
import CardList from '../CardList';
import MovieService from '../../services/MovieService';
import LoadingIndicator from '../LoadingIndicator';
import ErrorIndicator from '../ErrorIndicator';
import OfflineError from '../OfflineError';
import PaginationFilm from '../PaginationFilm';
import RatedFilm from '../RatedFilm';
import Context from '../MovieServiceContext';
import './App.css';

class App extends React.Component {
  moviesService = new MovieService();

  constructor() {
    super();
    this.state = {
      search: '',
      films: null,
      ratedFilm: [],
      loading: false,
      error: false,
      totalResults: 0,
      totalPages: 0,
      hasError: false,
      sessionId: null,
      genres: [],
    };
  }

  componentDidMount() {
    const { search, totalPages } = this.state;
    this.movieDisplay(search, totalPages);

    this.moviesService.getGuestSession().then((sessionId) => {
      this.setState({
        sessionId: sessionId.guest_session_id,
      });
    });

    this.moviesService.genres().then((genres) => {
      this.setState({
        genres: genres.genres,
      });
    });
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  movieDisplay = (search, page) => {
    this.moviesService
      .getMovies(search, page)
      .then((film) => {
        this.setState({
          search,
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

  rated = (sessionId) => {
    this.moviesService.getRatedFilm(sessionId).then((rated) => {
      this.setState({
        ratedFilm: rated.results,
      });
    });
  };

  onSearchFilm = (event) => {
    const searchFilm = event.target.value;
    this.setState(() => ({
      search: searchFilm,
    }));
    this.debounce(searchFilm, 1);
  };

  debounce = debounce((event, pageNumber) => {
    this.movieDisplay(event, pageNumber);
    this.setState(() => ({
      loading: true,
    }));
  }, 500);

  handlePageClick = (pageNumber) => {
    const { search } = this.state;
    this.movieDisplay(search, pageNumber);
  };

  render() {
    const {
      films,
      loading,
      error,
      totalResults,
      totalPages,
      hasError,
      ratedFilm,
      sessionId,
      genres,
      search,
    } = this.state;

    const { TabPane } = Tabs;

    if (hasError) {
      return <ErrorIndicator />;
    }

    const errorMessage = error ? <ErrorIndicator /> : null;

    const loadingIndicator =
      loading && navigator.onLine ? <LoadingIndicator /> : null;

    const content = !(loading || error) ? (
      <CardList films={films} ratedFilm={ratedFilm} />
    ) : null;

    const offline = !navigator.onLine ? <OfflineError /> : null;

    const pagination =
      totalPages > 1 && content ? (
        <PaginationFilm
          handlePageClick={this.handlePageClick}
          totalCount={totalResults}
        />
      ) : null;

    return (
      <Context.Provider value={{ genres, sessionId }}>
        <Tabs
          defaultActiveKey="Search"
          centered
          onChange={(key) => {
            if (key === 'Rated') this.rated(sessionId);
          }}
        >
          <TabPane tab="Search" key="Search">
            <div className="wrapper">
              <SearchPanel onSearchFilm={this.onSearchFilm} search={search} />
              {pagination}
              {errorMessage}
              {loadingIndicator}
              {content}
              {offline}
            </div>
          </TabPane>
          <TabPane tab="Rated" key="Rated">
            <div className="wrapper">
              {' '}
              <RatedFilm ratedFilm={ratedFilm} />
            </div>
          </TabPane>
        </Tabs>
      </Context.Provider>
    );
  }
}

export default App;
