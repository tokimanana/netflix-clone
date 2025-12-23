import { Component, effect, inject, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { Movie, MovieApiResponse } from '../../service/model/movie.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  readonly movieService = inject(MovieService);

  trendMovie: Movie | undefined;

  ngOnInit(): void {
    this.fetchMovieTrends();
  }

  constructor() {
    effect(() => {
      const trendMovieResponse: MovieApiResponse | undefined =
        this.movieService.fetchtrendMovie().value;
      if (trendMovieResponse) {
        this.trendMovie = trendMovieResponse.results[0];
      }
    });
  }

  fetchMovieTrends(): void {
    this.movieService.getTrends();
  }
}
