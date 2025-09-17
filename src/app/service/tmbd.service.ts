import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
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
export class TmbdService {
  http = inject(HttpClient);

  baseUrl: string = 'https://api.themoviedb.org';

  private fetchTrendMovies$: WritableSignal<
    State<MovieApiResponse, HttpErrorResponse>
  > = signal(
    State.Builder<MovieApiResponse, HttpErrorResponse>().forInit().build()
  );
  fetchtrendMovie = computed(() => this.fetchTrendMovies$());

  private genres$: WritableSignal<
    State<GenresResponse, HttpErrorResponse>
  > = signal(
    State.Builder<GenresResponse, HttpErrorResponse>().forInit().build()
  );
  genres = computed(() => this.genres$());


  getTrends(): void {
    this.http
      .get<MovieApiResponse>(`${this.baseUrl}/3/trending/movie/day`, {
        headers: this.getHeaders(),
      })
      .subscribe({
        next: (tmbdResponse) =>
          this.fetchTrendMovies$.set(
            State.Builder<MovieApiResponse, HttpErrorResponse>()
              .forSuccess(tmbdResponse)
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
        next: genresResponse =>
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

  constructor() {}

  getImageUrl(id: string, size: 'original' | 'w-500' | 'w-200'): string {
    return `https://image.tmdb.org/t/p/${size}/${id}`;
  }
}
