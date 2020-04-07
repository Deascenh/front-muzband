import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {Music} from '../../../core/models';

@Component({
  selector: 'app-music-data-panel',
  templateUrl: './music-data-panel.component.html',
  styleUrls: ['./music-data-panel.component.scss']
})
export class MusicDataPanelComponent implements OnChanges {
  @ViewChild('dataMode', {static: false}) dataMode: MatSlideToggle;
  @Input() music: Music;

  dataPanelOpen = true;
  readonly = true;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.watchDataMode();
  }

  private watchDataMode() {
    if (this.dataMode) {
      this.dataMode.change.subscribe(editMode => {
        this.readonly = !editMode.checked;
      });
    }
  }
}
