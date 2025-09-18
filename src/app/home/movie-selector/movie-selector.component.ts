import { Component, effect, inject, OnInit } from '@angular/core';
import { TmbdService } from '../../service/tmbd.service';
import { Genre, GenresResponse } from '../../service/model/genre.model';

@Component({
  selector: 'app-movie-selector',
  standalone: true,
  imports: [],
  templateUrl: './movie-selector.component.html',
  styleUrl: './movie-selector.component.scss'
})
export class MovieSelectorComponent implements OnInit{

  tmdbService = inject(TmbdService);

  genres: Genre[] | undefined;

  ngOnInit(): void {
    this.fetchAllGenres();
  }

  constructor() {
    effect(()=>{
      let genresResponse = this.tmdbService.genres().value ?? {genres: []} as GenresResponse;
      this.genres = genresResponse.genres;
    })
  }

  fetchAllGenres() {
    this.tmdbService.getAllGenres();
  }
}
