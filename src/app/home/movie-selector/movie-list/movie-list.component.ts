import { Component, effect, inject, Input, OnInit } from '@angular/core';
import { TmdbService } from '../../../service/tmdb.service';
import { Movie, MovieApiResponse } from '../../../service/model/movie.model';
import { MovieCardComponent } from "./movie-card/movie-card.component";

export type Mode = 'GENRE' | 'TREND';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnInit{
  @Input() genreId: number = -1;

  @Input() mode: Mode = 'GENRE';

  private readonly tmdbService = inject(TmdbService);

  moviesByGenre: Movie[] | undefined;

  constructor() {
    effect(() => {
      if(this.mode === 'GENRE') {
        const movieByGenreResponse =
          this.tmdbService.moviesByGenre().value ?? {} as MovieApiResponse;
        if(movieByGenreResponse.genreId === this.genreId) {
          this.moviesByGenre = movieByGenreResponse.results;
        }
      }
    })
  }

  ngOnInit(): void {
    this.fetchMoviesByGenre();
  }

  private fetchMoviesByGenre(): void {
    this.tmdbService.getMoviesByGenre(this.genreId)
  }
}
