import { create } from '../utils/utils';
import { templateCarString } from './templateSvgString';

const removeCarButton = create('button', 'remove-item');
const selectCarButton = create('button', 'select-item');

export const viewItem = create('li', 'view-item');
viewItem.insertAdjacentHTML('afterbegin', templateCarString);
