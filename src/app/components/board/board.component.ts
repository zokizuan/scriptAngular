import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  // function to generate coins
  CoinArrayGenerator = (coinsConfig: object) => {
    return Object.entries(coinsConfig).map(([k, v]) => {
      let arr: string[] = []
      for (let i = 1; i < (v + 1); i++) {
        arr.push(k + "_coin-" + i)
      }
      return arr
    }).flat()
  }
  constructor() {

  }

  ngOnInit(): void {
  this.GreenArr.push(undefined)
    
  }
  coinsConfig = {
    yellow: 10,
    red: 10,
    blue: 10,
    green: 10
  };

  coins = this.CoinArrayGenerator(this.coinsConfig);
  YellowArr = [] as any[];
  GreenArr = [] as any[];
  BlueArr = [] as any[];
  RedArr = [] as any[];
  TotalBoard = [this.GreenArr, this.RedArr, this.BlueArr, this.YellowArr];
  /* get isTodoAvailable(): boolean {
    return this.todo && this.todo.length < 5;
  } */
  get isDoneAvailable(): boolean {
    return this.GreenArr && this.GreenArr.length < 3;
  }
  /* todoPredicate = (): boolean => {
    return this.isTodoAvailable;
  } */
  donePredicate = (): boolean => {
    return this.isDoneAvailable;
}
  test() {
    console.log(this.YellowArr, this.GreenArr, this.BlueArr, this.RedArr);
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
