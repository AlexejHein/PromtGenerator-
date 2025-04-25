import { Component } from '@angular/core';
import { OpenaiService } from '../openai.service';

@Component({
  selector: 'app-generator',
  standalone: false,
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.scss'
})
export class GeneratorComponent {

  selectedType: string = 'text';  // Standardauswahl
  generatedPrompt: string = '';
  gptResponse: string = '';

  // Werte aus den Auswahlfeldern
  textOptions = {
    ziel: '',
    ton: '',
    rolle: ''
  };

  imageOptions = {
    stil: '',
    thema: '',
    licht: ''
  };

  codeOptions = {
    sprache: '',
    ziel: '',
    extras: ''
  };

  constructor(private openaiService: OpenaiService) {}

  generatePrompt(): void {
    switch (this.selectedType) {
      case 'text':
        this.generatedPrompt = `Schreibe einen ${this.textOptions.ton}en ${this.textOptions.ziel}-Text aus Sicht eines ${this.textOptions.rolle}.`;
        break;
      case 'image':
        this.generatedPrompt = `Erzeuge ein Bild im Stil von ${this.imageOptions.stil}, Thema: ${this.imageOptions.thema}, Lichtstimmung: ${this.imageOptions.licht}.`;
        break;
      case 'code':
        this.generatedPrompt = `Erstelle ein ${this.codeOptions.ziel} in ${this.codeOptions.sprache} mit Fokus auf ${this.codeOptions.extras}.`;
        break;
      default:
        this.generatedPrompt = '';
        break;
    }
    console.log('Generierter Prompt:', this.generatedPrompt);
  }

  callChatGPT(): void {
    if (!this.generatedPrompt) {
      console.warn('Kein Prompt vorhanden');
      return;
    }

    // Prompt analysieren für Themenstruktur
    const typ = this.selectedType;
    let thema = '';
    let stil = '';

    if (typ === 'text') {
      thema = this.textOptions.ziel || 'Text';
      stil = this.textOptions.ton || 'neutral';
    } else if (typ === 'image') {
      thema = this.imageOptions.thema || 'Szene';
      stil = this.imageOptions.stil || 'realistisch';
    } else if (typ === 'code') {
      thema = this.codeOptions.ziel || 'Script';
      stil = this.codeOptions.extras || 'einfach';
    }

    const requestBody = { thema, stil, typ };

    this.openaiService.getPromptFromBackend(requestBody).subscribe({
      next: (res) => {
        this.generatedPrompt = res.prompt;
      },
      error: (err) => {
        console.error(err);
        this.generatedPrompt = 'Fehler beim Abrufen der Antwort.';
      }
    });
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.generatedPrompt).then(() => {
      console.log('Prompt kopiert!');
    });
  }

  exportPrompt(): void {
    const blob = new Blob([this.generatedPrompt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompt.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
