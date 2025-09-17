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

  getTrends(): void {
    let headers: HttpHeaders = new HttpHeaders().set(
      'Authorization',
      `Bearer ${environment.TMDB_API_KEY}`
    );
    this.http
      .get<MovieApiResponse>(`${this.baseUrl}/3/trending/movie/day`, {
        headers,
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

  constructor() {}

  getImageUrl(id: string, size: 'original' | 'w-500' | 'w-200' ): string {
    return `https://image.tmdb.org/t/p/${size}/${id}`;
  }
}
