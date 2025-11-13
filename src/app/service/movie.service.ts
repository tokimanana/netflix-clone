import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { MovieApiResponse } from './model/movie.model';
import {
  errorState,
  initState,
  State,
  successState,
} from './model/state.model';
import { environment } from '../../environments/environment';
import { GenresResponse } from './model/genre.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = 'https://api.themoviedb.org';

  private trendMovies$ = signal<State<MovieApiResponse, HttpErrorResponse>>(
    initState()
  );
  private genres$ = signal<State<GenresResponse, HttpErrorResponse>>(
    initState()
  );
  private moviesByGenre$ = signal<State<MovieApiResponse, HttpErrorResponse>>(
    initState()
  );

  trendMovies = computed(() => this.trendMovies$());
  genres = computed(() => this.genres$());
  moviesByGenre = computed(() => this.moviesByGenre$());

  getTrends(): void {
    this.http
      .get<MovieApiResponse>(`${this.baseUrl}/3/trending/movie/day`, {
        headers: this.getHeaders(),
      })
      .subscribe({
        next: (movieResponse) =>
          this.trendMovies$.set(successState(movieResponse)),
        error: (err) => this.trendMovies$.set(errorState(err)),
      });
  }

  private getHeaders(): HttpHeaders {
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
        next: (genresResponse) => this.genres$.set(successState(genresResponse)),
        error: (err) => this.genres$.set(errorState(err)),
      });
  }

  getMoviesByGenre(genreId: number): void {
    const params = new HttpParams()
      .set('language', 'en-US')
      .set('with_genres', genreId);

    this.http
      .get<MovieApiResponse>(`${this.baseUrl}/3/discover/movie`, {
        headers: this.getHeaders(),
        params: params,
      })
      .subscribe({
        next: (moviesByGenreResponse) => {
          moviesByGenreResponse.genreId = +genreId;
          this.moviesByGenre$.set(
            successState(moviesByGenreResponse)
          );
        },
        error: (err) =>
          this.moviesByGenre$.set(
            errorState(err)
          ),
      });
  }

  resetMoviesByGenre(): void {
    this.moviesByGenre$.set(initState());
  }

  constructor() {}

  getImageUrl(id: string, size: 'original' | 'w500' | 'w300' | 'w200'): string {
    return `https://image.tmdb.org/t/p/${size}/${id}`;
  }
}
