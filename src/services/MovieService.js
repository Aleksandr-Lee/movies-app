export default class MovieService {
  apiBase = 'https://api.themoviedb.org/3/';

  apiKey = '465ee7f2ce04ca7b302380784fddcbe0';

  async getResource(url) {
    const res = await fetch(
      url
      // `${this.apiBase}${this.apiKey}&language=en-US&query=${url}&page=1&include_adult=false`
    );
    if (!res.ok) {
      throw new Error(`Ошибка, данные не получены ${res.status}`);
    }
    return res.json();
  }

  //   async getMovies() {
  //     const res = await this.getResource("return");
  //     return res.results.splice(0, 6);
  //   }

  async getMovies(search, page) {
    if (search === '') {
      return [];
    }
    const searchFilm = `&language=en-US&query=${search}&page=${page}&include_adult=false`;
    const url = `${this.apiBase}search/movie?api_key=${this.apiKey}${searchFilm}`;
    const res = await this.getResource(url);
    return res;
  }

  async getQuestSession() {
    const resSession = await fetch(
      `${this.apiBase}authentication/guest_session/new?api_key=${this.apiKey}`
    );
    return resSession.json();
  }

  async ratedFilm(id) {
    const ratedSession = await fetch(
      `${this.apiBase}guest_session/${id}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`
    );
    return ratedSession.json();
  }
}
// const movies = new MovieService();
// movies.getMovies().then((body) => {
//   console.log(body);
// });
