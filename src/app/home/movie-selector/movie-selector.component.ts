import { Component, effect, inject, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { Genre, GenresResponse } from '../../service/model/genre.model';
import { MovieListComponent } from './movie-list/movie-list.component';

@Component({
  selector: 'app-movie-selector',
  standalone: true,
  imports: [MovieListComponent],
  templateUrl: './movie-selector.component.html',
  styleUrls: ['./movie-selector.component.scss'],
})
export class MovieSelectorComponent implements OnInit {
  private readonly movieService = inject(MovieService);

  genres: Genre[] | undefined;

  ngOnInit(): void {
    this.fetchAllGenres();
  }

  constructor() {
    effect(() => {
      let genresResponse =
        this.movieService.genres().value ?? ({ genres: [] } as GenresResponse);
      this.genres = genresResponse.genres;
    });
  }

  fetchAllGenres() {
    this.movieService.getAllGenres();
  }
}
