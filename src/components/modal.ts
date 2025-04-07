import { create } from '../utils/utils';

export const modal = create('div', 'modal-window');
const title = create('p', 'modal-text');
title.textContent = 'AAAAAAAA';
modal.appendChild(title);
