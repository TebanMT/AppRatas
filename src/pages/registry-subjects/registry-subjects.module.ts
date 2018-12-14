import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrySubjectsPage } from './registry-subjects';

@NgModule({
  declarations: [
    RegistrySubjectsPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrySubjectsPage),
  ],
})
export class RegistrySubjectsPageModule {}
