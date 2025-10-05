import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './language.html',
})
export class Language {
  selectedLanguage = 'pl';
  languages = [
    { code: 'pl', label: 'Polski' },
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutch' },
  ];

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    console.log('Zmieniono język na:', lang);
  }
}