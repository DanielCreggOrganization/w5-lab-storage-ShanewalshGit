// src/app/pages/movies/movies.page.ts
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditMovieComponent } from 'src/app/edit-movie/edit-movie.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, EditMovieComponent],
})
export class MoviesPage implements OnInit {
  movieName: string = '';
  releaseYear: string = '';
  movies: { name: string; year: string }[] = [];
  errorMessage: string = '';

  constructor(private storageService: StorageService, private modalController: ModalController) {}

  async ngOnInit() {
    await this.loadMovies();
  }

  async addMovie() {
    if (this.movieName && this.releaseYear) {
      const movie = { name: this.movieName, year: this.releaseYear };
      this.movies.push(movie);
      try {
        await this.storageService.set('movies', this.movies);
        this.movieName = '';
        this.releaseYear = '';
        this.errorMessage = '';
      } catch (error) {
        console.error('Error adding movie:', error);
        this.errorMessage = 'Error adding movie. Please try again.';
      }
    } else {
      this.errorMessage = 'Movie name and release year are required.';
    }
  }

  async loadMovies() {
    try {
      const storedMovies = await this.storageService.get('movies');
      if (storedMovies) {
        this.movies = storedMovies;
      }
      this.errorMessage = '';
    } catch (error) {
      console.error('Error loading movies:', error);
      this.errorMessage = 'Error loading movies. Please try again.';
    }
  }

  async deleteMovie(index: number) {
    this.movies.splice(index, 1);
    try {
      await this.storageService.set('movies', this.movies);
      this.errorMessage = '';
    } catch (error) {
      console.error('Error deleting movie:', error);
      this.errorMessage = 'Error deleting movie. Please try again.';
    }
  }

  async openEditModal(index: number) {
    const modal = await this.modalController.create({
      component: EditMovieComponent,
      componentProps: {
        movie: { ...this.movies[index] }
      }
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        this.movies[index] = result.data;
        try {
          await this.storageService.set('movies', this.movies);
          this.errorMessage = '';
        } catch (error) {
          console.error('Error saving movie:', error);
          this.errorMessage = 'Error saving movie. Please try again.';
        }
      }
    });

    return await modal.present();
  }

  trackByIndex(index: number, movie: { name: string; year: string }) {
    return index;
  }

}