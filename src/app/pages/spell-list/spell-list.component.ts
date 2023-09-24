import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Dnd5eApiService } from 'src/app/services/dnd5e-api.service';

@Component({
  selector: 'app-spell-list',
  templateUrl: './spell-list.component.html',
  styleUrls: ['./spell-list.component.scss'],
})
export class SpellListComponent implements OnInit {
  public levels: any[] = [
    { level: 0, text: 'Cantrip' },
    { level: 1, text: '1st' },
    { level: 2, text: '2nd' },
    { level: 3, text: '3rd' },
    { level: 4, text: '4th' },
    { level: 5, text: '5th' },
    { level: 6, text: '6th' },
    { level: 7, text: '7th' },
    { level: 8, text: '8th' },
    { level: 9, text: '9th' },
  ];
  public schools: string[] = [
    'Abjuration',
    'Conjuration',
    'Divination',
    'Enchantment',
    'Evocation',
    'Illusion',
    'Necromancy',
    'Transmutation',
  ];
  public spells: any[] = [];

  public selectedLevels: number[] = [];
  public selectedSchools: string[] = [];

  public selectedSpell: any;

  constructor(
    private service: Dnd5eApiService,
    private toastr: ToastrService
  ) {}

  public selectLevelFilter = (selectedLevel: number): void => {
    if (this.selectedLevels.some((item) => item === selectedLevel)) {
      this.selectedLevels = this.selectedLevels.filter(
        (item) => item !== selectedLevel
      );
    } else this.selectedLevels = [...this.selectedLevels, selectedLevel];
  };

  public selectSchoolFilter = (selectedSchool: string): void => {
    if (this.selectedSchools.some((item) => item === selectedSchool)) {
      this.selectedSchools = this.selectedSchools.filter(
        (item) => item !== selectedSchool
      );
    } else this.selectedSchools = [...this.selectedSchools, selectedSchool];
  };

  public searchSpells = (): void => {
    const filterLevels = this.selectedLevels.map((item) => `level=${item}`);
    const filterSchools = this.selectedSchools.map((item) => `school=${item}`);
    const isFilterSelected = filterLevels.length || filterSchools.length;

    const filterString = `${isFilterSelected ? '?' : ''}${[
      ...filterLevels,
      ...filterSchools,
    ].join('&')}`;

    this.service.getSpells(filterString).subscribe(
      (data) => (this.spells = data.results),
      (err) => this.toastr.error(err.message)
    );
  };

  public showSpellDetails = (index: string): void => {
    const spellString = `/${index}`;

    this.service.getSpells(spellString).subscribe(
      (data) => (this.selectedSpell = data),
      (err) => this.toastr.error(err.message)
    );
  };

  ngOnInit(): void {
    this.service.getSpells('').subscribe(
      (data) => (this.spells = data.results),
      (err) => this.toastr.error(err.message)
    );
  }
}
