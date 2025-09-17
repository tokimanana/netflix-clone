import { Component, effect, inject, OnInit } from '@angular/core';
import { TmbdService } from '../../service/tmbd.service';
import { Movie, MovieApiResponse } from '../../service/model/movie.model';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent implements OnInit {

  readonly tmbdService = inject(TmbdService);

  trendMovie: Movie | undefined;

  ngOnInit(): void {
    this.fetchMovieTrends();
  }

  constructor() {
    effect(()=>{
      const trendMovieResponse: MovieApiResponse | undefined = this.tmbdService.fetchtrendMovie().value;
      if(trendMovieResponse) {
        this.trendMovie = trendMovieResponse.results[0];
      }
    })
  }

  fetchMovieTrends(): void {
    this.tmbdService.getTrends();
  }
}
