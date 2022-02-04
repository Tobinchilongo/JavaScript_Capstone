import './CSS/style.css';
import './CSS/popup.css';
import getData, { addLikes, getLikes } from './modules/ApiData.js';
import createCardItem from './modules/CardItem.js';
import enableComments from './modules/popup.js';
import displayTvShownumbers from './modules/counterItems.js';
import logo from './images/Screenshot.png';

const logoImg = new Image();
logoImg.src = logo;
logoImg.alt = 'logo';
logoImg.classList.add('logo');
document.querySelector('.link-logo').append(logoImg);

document.addEventListener('click', async (e) => {
  if (e.target.matches('.heart')) {
    e.target.classList.toggle('is-active');
    const id = Number(e.target.id);
    const like = Number(e.target.nextSibling.textContent.match(/[0-9]/g).join(''));
    e.target.nextSibling.textContent = `${like + 1} likes`;
    await addLikes(id);
  }
});

const renderItems = async () => {
  let index = 0;
  const itemsData = await getData();
  const likesData = await getLikes();
  displayTvShownumbers(itemsData);
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
