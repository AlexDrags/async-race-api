import { create } from '../utils/utils';
import { viewItem } from './itemList';

export const viewList = create('ul', 'view-list');
viewList.appendChild(viewItem);
