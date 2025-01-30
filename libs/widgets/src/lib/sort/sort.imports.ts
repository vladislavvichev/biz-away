import { ComponentImport } from '@biz-away/core';
import { CommonModule } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatOption, MatSelectModule } from '@angular/material/select';

export const SORT_IMPORTS: ComponentImport[] = [CommonModule, MatIconButton, MatIcon, MatSelectModule, MatOption];
