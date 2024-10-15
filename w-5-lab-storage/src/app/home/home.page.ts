// src/app/home/home.page.ts
import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class HomePage {
  key: string = '';
  value: string = '';
  output: string = '';

  constructor(private storageService: StorageService) {}

  async setItem() {
    try {
      await this.storageService.set(this.key, this.value);
      this.output = `Set ${this.key}: ${this.value}`;
    } catch (error) {
      console.error('Error setting item', error);
      this.output = `Error setting item: ${error}`;
    }
  }

  async getItem() {
    try {
      const value = await this.storageService.get(this.key);
      this.output = `Get ${this.key}: ${value}`;
    } catch (error) {
      console.error('Error getting item', error);
      this.output = `Error getting item: ${error}`;
    }
  }

  async removeItem() {
    try {
      await this.storageService.remove(this.key);
      this.output = `Removed ${this.key}`;
    } catch (error) {
      console.error('Error removing item', error);
      this.output = `Error removing item: ${error}`;
    }
  }

  async clear() {
    try {
      await this.storageService.clear();
      this.output = 'Cleared storage';
    } catch (error) {
      console.error('Error clearing storage', error);
      this.output = `Error clearing storage: ${error}`;
    }
  }

  async keys() {
    try {
      const keys = await this.storageService.keys();
      this.output = `Keys: ${keys.join(', ')}`;
    } catch (error) {
      console.error('Error getting keys', error);
      this.output = `Error getting keys: ${error}`;
    }
  }

  async length() {
    try {
      const length = await this.storageService.length();
      this.output = `Length: ${length}`;
    } catch (error) {
      console.error('Error getting length', error);
      this.output = `Error getting length: ${error}`;
    }
  }

  async forEach() {
    try {
      let output = '';
      await this.storageService.forEach((value, key, iterationNumber) => {
        output += `${iterationNumber}: ${key}: ${value}\n`;
      });
      this.output = output;
    } catch (error) {
      console.error('Error iterating over storage items', error);
      this.output = `Error iterating over storage items: ${error}`;
    }
  }

  async exists() {
    try {
      const exists = await this.storageService.exists(this.key);
      this.output = `Exists ${this.key}: ${exists}`;
    } catch (error) {
      console.error('Error checking if key exists', error);
      this.output = `Error checking if key exists: ${error}`;
    }
  }
}