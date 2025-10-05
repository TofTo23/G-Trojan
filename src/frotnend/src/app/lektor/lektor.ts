import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { Shared } from '../shared';

@Component({
  selector: 'app-lektor',
  imports: [],
  templateUrl: './lektor.html'
})
export class Lektor implements OnInit, OnDestroy {

  @Input() tekst: string = '';

  public ifPlays: boolean = false;
  public ifSupp: boolean = false;
  
  private utterance?: SpeechSynthesisUtterance;
  private readonly sharedLangaugeService = inject(Shared);
  private currentLanguage: string = 'pl'; // domyślny język

  ngOnInit(): void {
    if ('speechSynthesis' in window) {
      this.ifSupp = true;
    }

    // 🔥 Reagujemy na zmianę języka
    this.sharedLangaugeService.languageChanged.subscribe((language) => {
      this.currentLanguage = language;
      console.log('Zmieniono język lektora na:', language);

      // Jeśli aktualnie mówi — zatrzymaj
      if (this.ifPlays && this.ifSupp) {
        window.speechSynthesis.cancel();
        this.ifPlays = false;
      }
    });
  }
  
  ngOnDestroy(): void {
    if (this.ifSupp) {
      window.speechSynthesis.cancel();
    }
  }

  public clickOn(): void {
    if (!this.ifSupp) {
      return;
    }

    const synth = window.speechSynthesis;

    if (synth.speaking) {
      synth.cancel();
      return;
    }

    if (this.tekst) {
      this.utterance = new SpeechSynthesisUtterance(this.tekst);

      let voices = synth.getVoices();
      if (voices.length === 0) {
        synth.onvoiceschanged = () => {
          voices = synth.getVoices();
        };
      }

      // 🎙️ Ustawiamy głos i język w zależności od wybranego języka
      let langCode = 'pl-PL';
      switch (this.currentLanguage) {
        case 'en':
          langCode = 'en-US';
          break;
        case 'de':
          langCode = 'de-DE';
          break;
        case 'fr':
          langCode = 'fr-FR';
          break;
        case 'pl':
        default:
          langCode = 'pl-PL';
          break;
      }

      const selectedVoice = voices.find(v => v.lang.startsWith(langCode.split('-')[0]));
      if (selectedVoice) {
        this.utterance.voice = selectedVoice;
      }

      this.utterance.lang = langCode;
      this.utterance.rate = 0.9;

      this.utterance.onstart = () => {
        this.ifPlays = true;
      };

      this.utterance.onend = () => {
        this.ifPlays = false;
      };

      this.utterance.onerror = (event) => {
        console.error('Błąd syntezatora mowy:', event);
        this.ifPlays = false;
      };

      synth.speak(this.utterance);
    }
  }
}
