import {Directive, HostListener, HostBinding, EventEmitter, Output, Input} from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  @Input() private allowed_extensions : Array<string> = [];
  @Output() private filesChangeEmitter : EventEmitter<File[]> = new EventEmitter();
  @Output() private filesInvalidEmitter : EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style.background') background = '#eee';

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee'
  }

  @HostListener('drop', ['$event']) public onDrop(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    const files = evt.dataTransfer.files;
    const valid_files : Array<File> = [];
    const invalid_files : Array<File> = [];
    if(files.length > 0){
      for (const file of files) {
        const ext = file.name.split('.')[file.name.split('.').length - 1];
        if (this.allowed_extensions.lastIndexOf(ext) !== -1) {
          valid_files.push(file);
        } else {
          invalid_files.push(file);
        }
      }
      this.filesChangeEmitter.emit(valid_files);
      this.filesInvalidEmitter.emit(invalid_files);
    }
  }

}
