import { create } from '../utils/utils';
import { winnerResponse } from '../types/types';
import { winnersState } from '../modules/garageState';

export function createWinnerList(state: winnerResponse[]) {
  const winnersList = create('ul', 'list-hide-js');

  if (state) {
    state.forEach(async (objWiiner: winnerResponse) => {
      const winnerItem = create('li', 'winner-item');
      const winnerInfo = create('p', 'winner-text');
      const { id, wins, time } = objWiiner;
      winnerInfo.textContent = `Number: ${id}, Wins: ${wins}, Best time: ${time}`;

      winnerItem.appendChild(winnerInfo);
      winnersList.appendChild(winnerItem);
    });
    return winnersList;
  }
}
