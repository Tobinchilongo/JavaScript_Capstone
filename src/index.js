import './CSS/style.css';
import './CSS/popup.css';
import getData, { getLikes } from './modules/ApiData.js';
import createCardItem from './modules/CardItem.js';
import enableComments from './modules/popup.js';

const renderItems = async () => {
  let index = 0;
  const itemsData = await getData();
  const likesData = await getLikes();
  likesData.sort((a, b) => a.item_id - b.item_id);
  for (let i = 0; i < itemsData.length; i += 1) {
    if (likesData[index] !== undefined && itemsData[i].id === likesData[index].item_id) {
      createCardItem(itemsData[i], likesData[index]);
      index += 1;
    } else {
      createCardItem(itemsData[i]);
    }
  }
};

renderItems().then(() => {
  enableComments();
});
