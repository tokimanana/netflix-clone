import { Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../service/movie.service';
import { Movie } from '../service/model/movie.model';
import { debounce, filter, interval, map } from 'rxjs';
import { MovieCardComponent } from '../home/movie-selector/movie-list/movie-card/movie-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly movieService = inject(MovieService);

  movies: Movie[] = [];

  constructor() {
    effect(() => {
      let moviesResponse = this.movieService.search().value;
      if (moviesResponse !== undefined) {
        this.movies = moviesResponse.results;
      }
    });
  }

  ngOnInit(): void {
    this.onSearchTerm();
  }

  onSearchTerm(): void {
    this.activatedRoute.queryParams
      .pipe(
        filter((queryParam) => queryParam['q']),
        debounce(() => interval(300)),
        map((queryParam) => queryParam['q']),
      )
      .subscribe({
        next: (term) => this.movieService.searchByTerm(term),
      });
  }
}
