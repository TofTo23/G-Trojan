import { Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Shared } from '../shared';

@Component({
  selector: 'app-language',
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

  private languageService = inject(Shared)

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    console.log('Zmieniono język na:', lang);
    this.languageService.changeLanguage(lang);
  }
}