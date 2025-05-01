import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatFabButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { GeneratorComponent } from './generator/generator.component';
import {MatCard, MatCardHeader} from '@angular/material/card';
import {MatFormField} from '@angular/material/form-field';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent,
    FooterComponent,
    HomeComponent,
    GeneratorComponent,
    InfoDialogComponent,
    PrivacyPolicyComponent,
    LegalNoticeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatFabButton,
    MatCard,
    MatFormField,
    MatSelect,
    MatOption,
    MatIconModule,
    MatButtonModule,
    MatLabel,
    MatInput,
    MatCardHeader,
    FormsModule,
    HttpClientModule,
    MatProgressSpinner,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
