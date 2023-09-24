import { Component, OnInit } from '@angular/core';
import { Dnd5eApiService } from 'src/app/services/dnd5e-api.service';

@Component({
  selector: 'app-bestiary',
  templateUrl: './bestiary.component.html',
  styleUrls: ['./bestiary.component.scss'],
})
export class BestiaryComponent implements OnInit {
  public challengeRatings: any[] = [
    { cr: 1, category: 'Mild (0 to 1/2 CR)', crLevels: [0, 0.125, 0.25, 0.5] },
    { cr: 2, category: 'Bruising (1 and 2 CR)', crLevels: [1, 2] },
    { cr: 3, category: 'Bloody (3 to 5 CR)', crLevels: [3, 4, 5] },
    { cr: 4, category: 'Brutal (6 to 8 CR)', crLevels: [6, 7, 8] },
    { cr: 5, category: 'Oppresive (9 and 10 CR)', crLevels: [9, 10] },
    { cr: 6, category: 'Overwhelming (11 and 12 CR)', crLevels: [11, 12] },
    {
      cr: 7,
      category: 'Crushing (13 to 19 CR)',
      crLevels: [13, 14, 15, 16, 17, 18, 19],
    },
    {
      cr: 8,
      category: 'Devastating (20 to 24 CR)',
      crLevels: [20, 21, 22, 23, 24],
    },
    { cr: 9, category: 'Impossible (30 CR)', crLevels: [30] },
  ];

  public monsters: any[] = [];

  public selectedCRs: number[] = [];

  public selectedMonster: any;

  constructor(private service: Dnd5eApiService) {}

  public getAttributeModifier = (value: number): string => {
    const modifierValues: any = { 0: '-5', 1: '-4', 2: '-3', 3: '-2', 4: '-1' };
    const calculatedValue = Math.trunc(value / 2);

    if (calculatedValue < 5) {
      return modifierValues[calculatedValue];
    } else {
      return `+${calculatedValue - 5}`;
    }
  };

  public selectCRFilter = (selectedCR: number): void => {
    if (this.selectedCRs.some((item) => item === selectedCR)) {
      this.selectedCRs = this.selectedCRs.filter((item) => item !== selectedCR);
    } else this.selectedCRs = [...this.selectedCRs, selectedCR];
  };

  public searchMonsters = (): void => {
    const selectedCRsLevels: number[][] = this.selectedCRs.map(
      (item) => this.challengeRatings[item - 1].crLevels
    );
    const joinnedCRLevels: number[] = selectedCRsLevels.reduce(
      (acc, item): number[] => [...acc, ...item],
      []
    );
    const filterCRLevels = joinnedCRLevels.map(
      (item) => `challenge_rating=${item}`
    );
    const isFilterSelected = filterCRLevels.length;

    const filterString = `${isFilterSelected ? '?' : ''}${[
      ...filterCRLevels,
    ].join('&')}`;

    this.service
      .getMonsters(filterString)
      .subscribe((data) => (this.monsters = data.results));
  };

  public showMonsterDetails = (index: string): void => {
    const monsterString = `/${index}`;

    this.service
      .getMonsters(monsterString)
      .subscribe((data) => (this.selectedMonster = data));
  };

  ngOnInit(): void {
    this.service
      .getMonsters('')
      .subscribe((data) => (this.monsters = data.results));
  }
}
