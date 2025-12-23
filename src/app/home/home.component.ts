import { Component } from '@angular/core';
import { MainContentComponent } from './main-content/main-content.component';
import { MovieSelectorComponent } from './movie-selector/movie-selector.component';
import { MoreInfosComponent } from './more-infos/more-infos.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainContentComponent, MovieSelectorComponent, MoreInfosComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public movieId: number = -1;
}
