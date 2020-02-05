import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'lib-file-loader-dialog',
  templateUrl: './file-loader-dialog.component.html',
  styleUrls: ['./file-loader-dialog.component.css']
})
export class FileLoaderDialogComponent {
   fileList : any = [];
   invalidFiles : any = [];
  @ViewChild('fileInput', {static: true}) inputButton: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<FileLoaderDialogComponent>) { }


  onFilesChange(fileList : Array<File>):void {
    this.fileList = fileList;
  }

  onFileInvalids(fileList : Array<File>):void {
    this.invalidFiles = fileList;
  }

  openFileChooser(): void {
    this.inputButton.nativeElement.click();
  }

// todo: add preview
/*
  if (!file.type.startsWith('image/')){ continue }

var img = document.createElement("img");
img.classList.add("obj");
img.file = file;
preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

var reader = new FileReader();
reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
reader.readAsDataURL(file);*/
}
