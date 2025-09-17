import { Component, effect, inject, OnInit } from '@angular/core';
import { TmbdService } from '../../service/tmbd.service';
import { Movie, MovieApiResponse } from '../../service/model/movie.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent implements OnInit {

  readonly tmdbService = inject(TmbdService);

  trendMovie: Movie | undefined;

  ngOnInit(): void {
    this.fetchMovieTrends();
  }

  constructor() {
    effect(()=>{
      const trendMovieResponse: MovieApiResponse | undefined = this.tmdbService.fetchtrendMovie().value;
      if(trendMovieResponse) {
        this.trendMovie = trendMovieResponse.results[0];
      }
    })
  }

  fetchMovieTrends(): void {
    this.tmdbService.getTrends();
  }
}
