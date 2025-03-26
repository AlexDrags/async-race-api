import './style.scss';
import { getGarageCars } from './modules/garage';
import { panel } from './components/garageView';
const body = document.body;
console.log(panel);
// window.addEventListener('hashchange', () => {
//   if (location) locationResolver();
// });

window.addEventListener('load', () => {
  body.append(panel);

  // modal,
  // titleOptions,
  // listOptions(initialstate[0]),
  // addButton,
  // pasteButton,
  // saveButton,
  // clearButton,
  // startButton,
});

getGarageCars();
