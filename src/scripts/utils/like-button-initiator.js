import FavouriteRestaurant from '../data/favourite-restaurant';
import toastInitiator from './toast-initiator';
import {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
} from '../views/templates/template-component';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restaurant, toastContainer }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;
    this._toastContainer = toastContainer;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavouriteRestaurant.getRestaurant(id);
    return !!restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavouriteRestaurant.putRestaurant(this._restaurant);
      toastInitiator('Success, this restaurant added to your favourite');
      setTimeout(() => {
        this._renderButton();
      }, 2800);
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavouriteRestaurant.deleteRestaurant(this._restaurant.id);
      toastInitiator('Success, this restaurant deleted from your favourite');
      setTimeout(() => {
        this._renderButton();
      }, 2800);
    });
  },
};

export default LikeButtonInitiator;
