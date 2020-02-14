import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HighlightPipe } from './highlight.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SearchBarComponent, HighlightPipe]
})
export class SharedUiSearchBarModule {}
