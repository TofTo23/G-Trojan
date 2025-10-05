import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Shared {
  languageChanged = new Subject<string>();
  
  private lan!: string;


  changeLanguage(lan: string) {
    this.lan = lan;
    this.languageChanged.next(lan);
  }
}
