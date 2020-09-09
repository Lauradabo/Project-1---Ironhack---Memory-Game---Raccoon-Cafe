
export class MemoryCards {
    constructor(cards){
        this.cards = cards;
        this.pickedCards = [];
        this.pairsClicked = 0;
        this.pairsWon = 0;
    }

    shuffleCards(cards) {
        if (!cards)
        return cards;
        var m = cards.length, t, i; //t = temporary value and i= random index
        while (m !== 0) {
          i = Math.floor(Math.random() * m--);
          t = cards[m];
          cards[m] = cards[i];
          cards[i] = t;
        }
        return cards;
    }

    checkPairs(card1, card2) {
        this.pairsClicked++;
        if (card1 === card2) {
          this.pairsWon++;
          console.log(`checkPairs: this is true`);
          return true;
          } else {
            console.log(`checkPairs: this is false`);
            return false;
        }
    }

    gameOver() {
        if (this.pairsWon == 0 || this.pairsWon !== this.cards.length / 2) {
            return false;
          } else {
            return true;
          }
    }
}
