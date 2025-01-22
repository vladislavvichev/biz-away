import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ComponentImport } from '@biz-away/core';
import { FullScreenLayoutComponent } from '@biz-away/widgets';

export const APP_IMPORTS: ComponentImport[] = [CommonModule, RouterOutlet, FullScreenLayoutComponent];
