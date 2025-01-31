import { ComponentImport } from '@biz-away/core';
import { CommonModule } from '@angular/common';
import { MatSlider, MatSliderRangeThumb, MatSliderThumb } from '@angular/material/slider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatChipGrid, MatChipInput, MatChipRemove, MatChipRow } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

export const TRIPS_FILTER_IMPORTS: ComponentImport[] = [
   CommonModule,
   MatSlider,
   MatSliderThumb,
   MatSliderRangeThumb,
   MatFormField,
   MatChipGrid,
   MatChipRow,
   MatIcon,
   MatChipInput,
   MatLabel,
   MatChipRemove,
   ReactiveFormsModule,
   MatButton
];
