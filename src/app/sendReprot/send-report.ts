import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-send-report',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './send-report.html',
  styleUrl: './send-report.css'
})
export class SendReportComponent implements OnInit {
  selectedProblemId: String | null = null;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
   this.selectedProblemId = this.data?.selectedProblemId || null;
    console.log("Dialog opened. isProblemSelected =", this.selectedProblemId);
  }

}

/* export class NoReportSelectedComponent{
  constructor(@Inject(MAT_DIALOG_DATA)public data: any){}
} */
