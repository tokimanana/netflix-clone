import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgOptimizedImage, FaIconComponent, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  searchTerm: string = '';

  private readonly router: Router = inject(Router);

  onSearch(searchInput: string) {
    this.searchTerm = searchInput;
    if (this.searchTerm.length >= 1) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchTerm },
      });
    } else if (this.searchTerm.length === 0) {
      this.router.navigate(['/home']);
    }
  }
}
