import { Component } from '@angular/core';
import { OpenaiService } from '../openai.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-generator',
  standalone: false,
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.scss'
})
export class GeneratorComponent {

  selectedType: string = 'text';
  generatedPrompt: string = '';
  isLoading: boolean = false;
  customTopic: string = '';

  textOptions = { ziel: '', ton: '', rolle: '' };
  imageOptions = { stil: '', thema: '', licht: '' };
  codeOptions = { sprache: '', ziel: '', extras: '' };

  constructor(private openaiService: OpenaiService, private snackBar: MatSnackBar) {}

  generatePromptFromBackend(): void {
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

    const requestBody = {
      thema: this.customTopic || thema,
      stil,
      typ
    };

    this.isLoading = true;

    this.openaiService.getPromptFromBackend(requestBody).subscribe({
      next: (res) => {
        this.generatedPrompt = res.prompt;
        this.isLoading = false;
        this.showSnackBar('Prompt erfolgreich erstellt!', 'success');
      },
      error: (err) => {
        console.error(err);
        this.generatedPrompt = 'Fehler beim Abrufen der Antwort.';
        this.isLoading = false;
        this.showSnackBar('Fehler beim Erstellen des Prompts.', 'error');
      }
    });
  }

  showSnackBar(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Schließen', {
      duration: 3000,
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
      horizontalPosition: 'center',
      verticalPosition: 'top'
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
