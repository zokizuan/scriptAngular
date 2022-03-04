import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit,AfterViewInit {

  // function to generate coins
  CoinArrayGenerator = (coinsConfig: object) => {
    return Object.entries(coinsConfig).map(([k, v]) => {
      let arr: string[] = []
      for (let i = 1; i < (v + 1); i++) {
        arr.push("coin-" + i)
      }
      return arr
    }).flat()
  }
  constructor() {
// this.GreenArr.push('d1_coin-1');
  }

  ngOnInit(): void {
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
  
  
  @ViewChild('test')
  test!: ElementRef;
  get isDoneAvailable(): boolean {
    return this.GreenArr && this.GreenArr.length < 10;
  }
  ngAfterViewInit(): void {
    const divEl: HTMLDivElement = this.test.nativeElement;
    console.log(divEl);
  }
  arrLengthCheck!: boolean;
  
  checkArrayLength(arr:any[]):boolean {
    return arr && arr.length < 10;  
    // return true
  }
  
  checkArrayLengthPredicate = (): boolean => {
    console.log(this.isDoneAvailable,)
    return this.isDoneAvailable;
  }
  
  
  
  drop(event: CdkDragDrop<any>) {
    if (event.container.data.length >= 10 && event.container.id !== "coinContainer") { 
      console.log(event)
      console.log("dont drop here")
      return
      // console.log(arrivalList.length)
    }
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
