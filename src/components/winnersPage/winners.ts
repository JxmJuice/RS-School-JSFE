import { getCar, getSortOrder, getWinners, getWinnersAmount } from "../../api";
import { store } from "../../store";
import { BaseComponent } from "../baseComponent";
import { WinnerModel } from "../models/winnerModel";
import { Winner } from "../winner/winner";
import "./winners.scss";

export class Winners extends BaseComponent {
  isAsc: boolean

  constructor() {
    super("div", ["winners", "hidden"]);
    this.element.innerHTML = `
    <div class="winners">
        <h1 class="winners_title">Winners (1)</h1>
        <div class="pagination">
            <button id="winners_prev-page" class="pagination_btn">prev</button>
            <button id="winners_next-page" class="pagination_btn">next</button>
            <div class="winners_pagination__page">Page #${store.winnersPage}</div>
        </div>
        <div class="winners_table">
        <div class="winners_table__header">
            <div class="number">Number</div>
            <div class="model">Model</div>
            <div class="name">Name</div>
            <div class="wins">Wins</div>
            <div class="best-time">Best Time</div>
        </div>
      </div>
    </div>
      `;
      const sortOrder = store.sortOrder;
      this.isAsc = true;
    this.handleTitle();
    this.handleWinners(sortOrder);
    this.handleNextPage();
    this.handlePrevPage();
  }

  async handleTitle() {
    const sortOrder = await getSortOrder("id", "ASC");
    if (sortOrder) {
      const winnersAmount = await getWinnersAmount(
        store.winnersPage,
        store.winnersLimit,
        sortOrder
      );
      const title = document.querySelector(".winners_title");
      if (title) {
        title.innerHTML = `Winners (${winnersAmount})`;
      }
    }
  }

  async handleNextPage() {
    const winnersAmount = await getWinnersAmount(
      store.winnersPage,
      store.winnersLimit,
      store.sortOrder
    );

    const pageNumber = document.querySelector('.winners_pagination__page');
    const nextPageBtn = document.getElementById(
      "winners_next-page"
    ) as HTMLButtonElement;
    const prevPageBtn = document.getElementById(
      "winners_prev-page"
    ) as HTMLButtonElement;
 
    if (winnersAmount && pageNumber) {
      if (Math.ceil(+winnersAmount / store.winnersLimit) <= store.winnersPage) {
        nextPageBtn.disabled = true;
      }
      nextPageBtn.addEventListener("click", () => {
        store.winnersPage++;
        pageNumber.innerHTML = `Page #${store.winnersPage}`
        if (store.winnersPage != 1) {
          prevPageBtn.disabled = false;
        }
        if (Math.ceil(+winnersAmount / store.winnersLimit) <= store.winnersPage) {
          nextPageBtn.disabled = true;
        }
        const table = document.querySelector(".winners_table");
        if (table)
          table.innerHTML = `
          <div class="winners_table__header">
            <div class="number">Number</div>
            <div class="model">Model</div>
            <div class="name">Name</div>
            <div class="wins">Wins</div>
            <div class="best-time">Best Time</div>
        </div>
          `;
          this.handleWinners(store.sortOrder);
      });
    }
  }

  async handlePrevPage() {
    const winnersAmount = await getWinnersAmount(
      store.winnersPage,
      store.winnersLimit,
      store.sortOrder
    );
    const pageNumber = document.querySelector('.winners_pagination__page');
    const prevPageBtn = document.getElementById(
      "winners_prev-page"
    ) as HTMLButtonElement;
    const nextPageBtn = document.getElementById(
      "winners_next-page"
    ) as HTMLButtonElement;
    if (winnersAmount && pageNumber) {
      if (store.winnersPage == 1) {
        prevPageBtn.disabled = true;
      }
      prevPageBtn.addEventListener("click", () => {
        store.winnersPage--;
        pageNumber.innerHTML = `Page #${store.winnersPage}`
        if (Math.ceil(+winnersAmount / store.winnersLimit) >= store.winnersPage) {
          nextPageBtn.disabled = false;
        }
        if (store.winnersPage == 1) {
          prevPageBtn.disabled = true;
        }
        const table = document.querySelector('.winners_table')
        if (table)
        table.innerHTML = `
        <div class="winners_table__header">
            <div class="number">Number</div>
            <div class="model">Model</div>
            <div class="name">Name</div>
            <div class="wins">Wins</div>
            <div class="best-time">Best Time</div>
        </div>
          `;
          this.handleWinners(store.sortOrder);
      });
    }
  }

  handleSort(){
    this.handleWinsSort();
    this.handleTimeSort();
  }

  async handleWinsSort() {
    const wins = document.querySelector('.wins');

    wins?.addEventListener('click',async ()=>{
      if(this.isAsc == true){
        this.isAsc = false
        store.sortOrder = await getSortOrder('wins','DESC') as string;
      } else {
        this.isAsc = true;
        store.sortOrder = await getSortOrder('wins','ASC') as string;
      }
      this.handleWinners(store.sortOrder)
    })
  }

  async handleTimeSort() {
    const time = document.querySelector('.best-time');
    time?.addEventListener('click',async ()=>{
      if(this.isAsc == true){
        this.isAsc = false
        store.sortOrder = await getSortOrder('time','DESC') as string;
      } else {
        this.isAsc = true;
        store.sortOrder = await getSortOrder('time','ASC') as string;
      }
      this.handleWinners(store.sortOrder)
    })
  }

  async handleWinners(sortOrder:string) {
    const table = document.querySelector(".winners_table");
    if (table) {
      table.innerHTML = `
    <div class="winners_table__header">
    <div class="number">Number</div>
    <div class="model">Model</div>
    <div class="name">Name</div>
    <div class="wins">Wins</div>
    <div class="best-time">Best Time</div>
</div>
    `;
    }
    if (sortOrder) {
      const winners = await getWinners(
        store.winnersPage,
        store.winnersLimit,
        sortOrder
      );
      let i = 1;
      winners.forEach(async (element: WinnerModel) => {
        const car = await getCar(element.id + "");
        const winner = new Winner(
          +`${store.winnersPage - 1}${i}`,
          car.color,
          car.name,
          element.wins,
          element.time
        );
        document.querySelector(".winners_table")?.appendChild(winner.element);
        i++;
      });
    }
    this.handleSort();
    this.handleTitle();
  }
}
