import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-header-menu',
  standalone: false,
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.scss'
})
export class HeaderMenuComponent {

  constructor(private dialog: MatDialog) { }

  openInfoDialog(): void {
    this.dialog.open(InfoDialogComponent, {
      width: '400px'
    });
  }
}
