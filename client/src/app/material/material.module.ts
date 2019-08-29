import { NgModule } from '@angular/core';
import { 
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatToolbarModule,
  MatSelectModule,
  MatDialogModule,
  MatGridListModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatTooltipModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatBadgeModule
} from '@angular/material'

const material = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatToolbarModule,
  MatSelectModule,
  MatDialogModule,
  MatGridListModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatTooltipModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatBadgeModule
]

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
