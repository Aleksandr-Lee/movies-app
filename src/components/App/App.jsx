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
      films: null,
      ratedFilm: [],
      loading: false,
      error: false,
      pageSize: 20,
      totalResults: 0,
      totalPages: 0,
      hasError: false,
      sessionId: null,
      genres: [],
    };
  }

  componentDidMount() {
    this.movieDisplay = (search, page) => {
      this.moviesService
        .getMovies(search, page)
        .then((film) => {
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

    this.moviesService.getGuestSession().then((sessionId) => {
      this.setState({
        sessionId: sessionId.guest_session_id,
      });
    });

    this.rated = (sessionId) => {
      this.moviesService.getRatedFilm(sessionId).then((rated) => {
        this.setState({
          ratedFilm: rated.results,
        });
      });
    };

    this.moviesService.genres().then((genres) => {
      this.setState({
        genres: genres.genres,
      });
    });
  }

  componentDidCatch() {
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

  render() {
    const {
      films,
      loading,
      error,
      totalResults,
      pageSize,
      totalPages,
      hasError,
      ratedFilm,
      sessionId,
      genres,
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
          pageSize={pageSize}
        />
      ) : null;

    return (
      <Context.Provider value={{ genres, sessionId }}>
        <Tabs
          defaultActiveKey="1"
          centered
          onChange={(key) => {
            if (key === '2') this.rated(sessionId);
          }}
        >
          <TabPane tab="Search" key="1">
            <div className="wrapper">
              <SearchPanel onSearchFilm={this.onSearchFilm} />
              {pagination}
              {errorMessage}
              {loadingIndicator}
              {content}
              {offline}
            </div>
          </TabPane>
          <TabPane tab="Rated" key="2">
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
