import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SendReportComponent } from '../sendReprot/send-report';

@Component({
  selector: 'app-report-log',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './report-log.component.html',
  styleUrls: ['./report-log.component.css']
})
export class ReportLogComponent {
  constructor(private dialogRef: MatDialogRef<ReportLogComponent>, private dialog:MatDialog){}

  selectedProblemId: string | null = null;

  selectProblem(id: string): void {
    this.selectedProblemId = id;
  }

  submitReport(): void {
    if (!this.selectedProblemId) {
    this.openCorrectionWindow(); // show modal
    }
    else{
          this.openConfirmationWindow(); // show modal
    }
    this.selectedProblemId = null; // reset selection
  }

  close(){
    this.dialog.closeAll();
  };

  closeReportLog(){
    this.dialogRef.close();
  }

  openConfirmationWindow(): void {
    this.dialog.open(SendReportComponent, {
      width: '400px',
      autoFocus: false,
      data: {
        selectedProblemId: this.selectedProblemId
      }
    });
  }

    openCorrectionWindow(): void {
    this.dialog.open(SendReportComponent, {
      width: '400px',
      autoFocus: false,
      data: {
        selectedProblemId: null
      }
    });
  }
}
