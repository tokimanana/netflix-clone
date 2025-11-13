import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { MovieApiResponse } from './model/movie.model';
import { State } from './model/state.model';
import { environment } from '../../environments/environment';
import { GenresResponse } from './model/genre.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  http = inject(HttpClient);

  baseUrl: string = 'https://api.themoviedb.org';

  private fetchTrendMovies$: WritableSignal<
    State<MovieApiResponse, HttpErrorResponse>
  > = signal(
    State.Builder<MovieApiResponse, HttpErrorResponse>().forInit().build()
  );
  fetchtrendMovie = computed(() => this.fetchTrendMovies$());

  private genres$: WritableSignal<State<GenresResponse, HttpErrorResponse>> =
    signal(
      State.Builder<GenresResponse, HttpErrorResponse>().forInit().build()
    );
  genres = computed(() => this.genres$());

  private moviesByGenre$: WritableSignal<
    State<MovieApiResponse, HttpErrorResponse>
  > = signal(
    State.Builder<MovieApiResponse, HttpErrorResponse>().forInit().build()
  );
  moviesByGenre = computed(() => this.moviesByGenre$());

  getTrends(): void {
    this.http
      .get<MovieApiResponse>(`${this.baseUrl}/3/trending/movie/day`, {
        headers: this.getHeaders(),
      })
      .subscribe({
        next: (tmdbResponse) =>
          this.fetchTrendMovies$.set(
            State.Builder<MovieApiResponse, HttpErrorResponse>()
              .forSuccess(tmdbResponse)
              .build()
          ),
        error: (err) =>
          this.fetchTrendMovies$.set(
            State.Builder<MovieApiResponse, HttpErrorResponse>()
              .forError(err)
              .build()
          ),
      });
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      `Bearer ${environment.TMDB_API_KEY}`
    );
  }

  getAllGenres(): void {
    this.http
      .get<GenresResponse>(`${this.baseUrl}/3/genre/movie/list`, {
        headers: this.getHeaders(),
      })
      .subscribe({
        next: (genresResponse) =>
          this.genres$.set(
            State.Builder<GenresResponse, HttpErrorResponse>()
              .forSuccess(genresResponse)
              .build()
          ),
        error: (err) =>
          this.genres$.set(
            State.Builder<GenresResponse, HttpErrorResponse>()
              .forError(err)
              .build()
          ),
      });
  }

  getMoviesByGenre(genreId: number): void {
    let queryParams = new HttpParams();
    queryParams = queryParams.set('language', 'en-US');
    queryParams = queryParams.set('with_genres', genreId);

    this.http
      .get<MovieApiResponse>(`${this.baseUrl}/3/discover/movie`, {
        headers: this.getHeaders(),
        params: queryParams,
      })
      .subscribe({
        next: (moviesByGenreResponse) => {
          moviesByGenreResponse.genreId = +genreId;
          this.moviesByGenre$.set(
            State.Builder<MovieApiResponse, HttpErrorResponse>()
              .forSuccess(moviesByGenreResponse)
              .build()
          );
        },
        error: (err) =>
          this.moviesByGenre$.set(
            State.Builder<MovieApiResponse, HttpErrorResponse>()
              .forError(err)
              .build()
          ),
      });
  }

  constructor() {}

  getImageUrl(id: string, size: 'original' | 'w500' | 'w300' | 'w200'): string {
    return `https://image.tmdb.org/t/p/${size}/${id}`;
  }
}
