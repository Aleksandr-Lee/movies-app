export default class MovieService {
  apiBase = 'https://api.themoviedb.org/3/';

  apiKey = '465ee7f2ce04ca7b302380784fddcbe0';

  async getResource(url, postRequest = null) {
    const res = await fetch(url, postRequest);
    if (!res.ok) {
      throw new Error(`Ошибка, данные не получены ${res.status}`);
    }
    return res.json();
  }

  async getMovies(search, page) {
    if (search === '') {
      return [];
    }
    const searchFilm = `&language=en-US&query=${search}&page=${page}&include_adult=false`;
    const url = `${this.apiBase}search/movie?api_key=${this.apiKey}${searchFilm}`;
    const res = await this.getResource(url);
    return res;
  }

  async getGuestSession() {
    const url = `${this.apiBase}authentication/guest_session/new?api_key=${this.apiKey}`;
    const res = await this.getResource(url);
    return res;
  }

  async setRatedFilm(id, sessionId, value) {
    const url = `${this.apiBase}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${sessionId}`;
    const postRequest = {
      method: 'POST',
      api_key: this.apiKey,
      movie_id: id,
      body: JSON.stringify({ value }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
    const res = await this.getResource(url, postRequest);
    return res;
  }

  async ratedFilm(sessionId) {
    const url = `${this.apiBase}guest_session/${sessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`;
    const res = await this.getResource(url);
    return res;
  }

  async genres() {
    const url = `${this.apiBase}genre/movie/list?api_key=${this.apiKey}&language=en-US`;
    const res = await this.getResource(url);
    return res;
  }
}
