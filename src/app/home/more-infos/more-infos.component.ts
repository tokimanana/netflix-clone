import {
  Component,
  effect,
  inject,
  Input,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { Movie } from '../../service/model/movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-more-infos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './more-infos.component.html',
  styleUrls: ['./more-infos.component.scss'],
})
export class MoreInfosComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public movieId: number = -1;

  readonly movieService = inject(MovieService);

  movie: Movie | undefined;

  constructor() {
    effect(() => {
      this.movie = this.movieService.movieById().value;
    });
  }

  getMovieById() {
    this.movieService.getMovieById(this.movieId);
  }

  ngOnInit(): void {
    if (this.movieId && this.movieId > 0) {
      this.getMovieById();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movieId'] && this.movieId && this.movieId > 0) {
      this.getMovieById();
    }
  }

  ngOnDestroy(): void {
    this.movieService.clearMovieById();
  }
}
