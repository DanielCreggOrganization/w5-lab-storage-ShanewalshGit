// src/app/components/edit-movie/edit-movie.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class EditMovieComponent {
  @Input() movie!: { name: string; year: string };
  @Output() save = new EventEmitter<{ name: string; year: string }>();
  @Output() cancel = new EventEmitter<void>();

  constructor() {}

  onSave() {
    this.save.emit(this.movie);
  }

  onCancel() {
    this.cancel.emit();
  }
}