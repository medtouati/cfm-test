import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ContactListComponent } from './contact/contact-list/contact-list.component';

import { AgGridModule } from 'ag-grid-angular';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemContactService } from './services/in-mem-contact.service';
import { AddContactComponent } from './contact/add-contact/add-contact.component';
import { UpdateContactComponent } from './contact/update-contact/update-contact.component';


import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';


import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MatInputComponent } from './utils/mat-input.component';
import { DeleteContactComponent } from './contact/delete-contact/delete-contact.component';
registerLocaleData(localeFr);


@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    AddContactComponent,
    UpdateContactComponent,

    MatInputComponent,

    DeleteContactComponent
  ],
  entryComponents:[
    AddContactComponent,
    UpdateContactComponent,
    DeleteContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,

    AgGridModule.withComponents([ MatInputComponent]),

    HttpClientModule,

    HttpClientInMemoryWebApiModule.forRoot(InMemContactService),

    BrowserAnimationsModule,

    
    

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
