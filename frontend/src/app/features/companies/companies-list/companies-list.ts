import { Component, inject } from '@angular/core';
import { CompaniesService } from '../../../core/services/companies.service';

@Component({
  selector: 'app-companies-list',
  imports: [],
  templateUrl: './companies-list.html',
  styleUrl: './companies-list.scss',
})
export class CompaniesList {
  private readonly companiesService = inject(CompaniesService);

  ngOnInit() {
    this.companiesService.getAll().subscribe((data) => console.log('companies', data));
  }
}
