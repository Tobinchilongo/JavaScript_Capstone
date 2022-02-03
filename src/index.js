import './style.css';
import getData from './modules/ApiData.js';
import createCardItem from './modules/CardItem.js';


const renderItems = async () => {
  const itemsData = await getData();
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < itemsData.length; i++) {
    createCardItem(itemsData[i]);
  }
};

renderItems();
