import {
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
} from '../views/templates/template-component';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, favouriteRestaurant, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;
    this._favouriteRestaurant = favouriteRestaurant;

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
    const restaurant = await this._favouriteRestaurant.getRestaurant(id);
    return !!restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favouriteRestaurant.putRestaurant(this._restaurant);
      // toastInitiator('Success, this restaurant added to your favourite');
      // setTimeout(() => {
      // }, 2800);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikeRestaurantButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favouriteRestaurant.deleteRestaurant(this._restaurant.id);
      // toastInitiator('Success, this restaurant deleted from your favourite');
      // setTimeout(() => {
      // }, 2800);
      this._renderButton();
    });
  },
};

export default LikeButtonPresenter;
