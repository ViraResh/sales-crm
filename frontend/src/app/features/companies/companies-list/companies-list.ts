import { Component, inject, OnInit, signal } from '@angular/core';
import { CompaniesService } from '../../../core/services/companies.service';
import { Company } from '../../../core/models/company.model';
import { DatePipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CompanyFormDialog } from '../company-form-dialog/company-form-dialog';
import { MatButton, MatIconButton } from '@angular/material/button';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-companies-list',
  imports: [
    DatePipe,
    MatProgressSpinner,
    MatIcon,
    MatButton,
    MatIconButton
  ],
  templateUrl: './companies-list.html',
  styleUrl: './companies-list.scss',
})
export class CompaniesList implements OnInit {
  private readonly companiesService = inject(CompaniesService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  readonly error = signal(false);

  readonly companies = signal<Company[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.loadCompanies();
  }

  openCreateDialog(): void {
    const ref = this.dialog.open(CompanyFormDialog, {
      data: null,
      width: '440px',
    });

    ref.afterClosed().subscribe((created: Company | undefined) => {
      if (created) {
        this.companies.update((list) => [created, ...list]);
        this.notify('Company created');
      }
    });
  }

  openEditDialog(company: Company): void {
    const ref = this.dialog.open(CompanyFormDialog, {
      data: company,
      width: '440px',
    });

    ref.afterClosed().subscribe((updated: Company | undefined) => {
      if (updated) {
        this.companies.update((list) =>
          list.map((c) => (c.id === updated.id ? updated : c)),
        );
        this.notify('Company updated');
      }
    });
  }

  confirmDelete(company: Company): void {
    const ref = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Delete company',
        message: `Delete "${company.name}"? This cannot be undone.`,
      },
      width: '400px',
    });

    ref.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteCompany(company.id);
      }
    });
  }

  retry(): void {
    this.loadCompanies();
  }

  private loadCompanies(): void {
    this.loading.set(true);
    this.error.set(false);
    this.companiesService.getAll().subscribe({
      next: (data) => {
        this.companies.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  private deleteCompany(id: string): void {
    this.companiesService.delete(id).subscribe({
      next: () => {
        this.companies.update((list) => list.filter((c) => c.id !== id));
        this.notify('Company deleted');
      },
    });
  }

  private notify(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }
}
