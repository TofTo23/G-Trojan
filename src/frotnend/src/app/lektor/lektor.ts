import { Component, Input, OnInit, OnDestroy } from '@angular/core';

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

  ngOnInit(): void {
    if ('speechSynthesis' in window) {
      this.ifSupp = true;
    }
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
    } else if (this.tekst) {
      this.utterance = new SpeechSynthesisUtterance(this.tekst);

      // voice download
      let voices = synth.getVoices();
      if (voices.length === 0) {
        synth.onvoiceschanged = () => {
          voices = synth.getVoices();
        };
      }

      // choose polish voide
      const plVoice = voices.find(v => v.lang.startsWith('pl'));
      if (plVoice) {
        this.utterance.voice = plVoice;
      }

      this.utterance.lang = 'pl-PL';
      this.utterance.rate = 0.8;

      this.utterance.onstart = () => {
        this.ifPlays = true;
      };

      this.utterance.onend = () => {
        this.ifPlays = false;
      };

      this.utterance.onerror = (event) => {
        console.error('Wystąpił błąd syntezatora mowy.', event);
        this.ifPlays = false;
      };

      synth.speak(this.utterance);
    }
  }
}
