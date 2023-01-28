import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';

import { AboutMeModalComponent } from '../about-me-modal/about-me-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,ReactiveFormsModule,FormsModule
  ],
  declarations: [ProfilePage,AboutMeModalComponent]
})
export class ProfilePageModule {}
