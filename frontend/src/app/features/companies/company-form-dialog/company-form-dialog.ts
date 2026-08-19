import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CompaniesService } from '../../../core/services/companies.service';
import { Company } from '../../../core/models/company.model';

@Component({
  selector: 'app-company-form-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './company-form-dialog.html',
  styleUrl: './company-form-dialog.scss',
})
export class CompanyFormDialog {
  private readonly fb = inject(FormBuilder);
  private readonly companiesService = inject(CompaniesService);
  private readonly dialogRef = inject(MatDialogRef<CompanyFormDialog>);
  private readonly data = inject<Company | null>(MAT_DIALOG_DATA);

  readonly loading = signal(false);
  readonly isEdit = !!this.data;

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    website: [''],
    industry: [''],
    phone: [''],
  });

  constructor() {
    if (this.data) {
      this.form.patchValue({
        name: this.data.name,
        website: this.data.website ?? '',
        industry: this.data.industry ?? '',
        phone: this.data.phone ?? '',
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const value = this.form.getRawValue();

    const request$ = this.isEdit
      ? this.companiesService.update(this.data!.id, value)
      : this.companiesService.create(value);

    request$.subscribe({
      next: (company) => this.dialogRef.close(company),
      error: () => this.loading.set(false),
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
