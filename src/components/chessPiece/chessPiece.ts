import { BaseComponent } from "../base-component";
import "./chessPiece.scss";

export class Piece extends BaseComponent {
  pieceColor: string;

  isAbleToMove: boolean;

  startPosition: HTMLElement|null;

  constructor(pieceType: string, color: string) {
    super("div", ["chess-piece", `chess-piece_${color}`, pieceType]);
    this.pieceColor = color;
    this.startPosition = null;
    this.isAbleToMove = false;
  }

  handleMove(event: MouseEvent) {
    const thisPiece = this;
    const piece = this.element;
    this.startPosition = piece.parentElement;

    let shiftX = event.clientX - piece.getBoundingClientRect().left;
    let shiftY = event.clientY - piece.getBoundingClientRect().top;

    piece.style.position = "absolute";
    piece.style.zIndex = "1000";
    document.body.append(piece);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX: number, pageY: number) {
      piece.style.left = pageX - shiftX + "px";
      piece.style.top = pageY - shiftY + "px";
    }

    let currentDroppable: HTMLElement;

    function onMouseMove(event: MouseEvent) {
      moveAt(event.pageX, event.pageY);

      piece.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      piece.hidden = false;

      if (!elemBelow) {
        piece.style.position = "";
        piece.style.zIndex = "";
        piece.style.left = "";
        piece.style.top = "";
        thisPiece.startPosition?.appendChild(piece);
        return;
      }

      let droppableBelow = elemBelow.closest(".valid") as HTMLElement;

      if (currentDroppable != droppableBelow) {
        if (currentDroppable) {
          currentDroppable.classList.remove("highlight");
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          currentDroppable.classList.add("highlight");
        }
      }
    }
    document.addEventListener("mousemove", onMouseMove);

    piece.addEventListener(
      "mouseup",
      function () {
        if (currentDroppable) {
          if (currentDroppable.classList.contains("valid")) {
            piece.style.position = "";
            piece.style.zIndex = "";
            piece.style.left = "";
            piece.style.top = "";
            currentDroppable.innerHTML = "";
            currentDroppable.appendChild(piece);
            currentDroppable.classList.remove("highlight");
          }
          document.removeEventListener("mousemove", onMouseMove);
          piece.onmouseup = null;
        }
        else if (thisPiece.startPosition != document.body) {
          piece.style.position = "";
          piece.style.zIndex = "";
          piece.style.left = "";
          piece.style.top = "";
          thisPiece.startPosition?.appendChild(piece);
        }
      },
      { once: true }
    );

    document.ondragstart = function () {
      return false;
    };
  }

  // handleClick(initialPlace: HTMLElement | null) {
  //   const piece = this.element;
  //   console.log(piece);
  //   document.querySelectorAll(".valid").forEach((el) =>
  //     el.addEventListener(
  //       "click",
  //       () => {
  //         el.appendChild(piece);
  //         if (initialPlace) initialPlace.firstElementChild?.remove();
  //         document
  //           .querySelectorAll(".valid")
  //           .forEach((el) => el.classList.remove("valid"));
  //       },
  //       { once: true }
  //     )
  //   );
  // }
}
