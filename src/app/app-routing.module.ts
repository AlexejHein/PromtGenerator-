import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GeneratorComponent } from './generator/generator.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {LegalNoticeComponent} from './legal-notice/legal-notice.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'generator', component: GeneratorComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
