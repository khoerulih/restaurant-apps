import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';
import FavouriteRestaurant from '../../src/scripts/data/favourite-restaurant';

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favouriteRestaurant: FavouriteRestaurant,
    restaurant,
  });
};

export { createLikeButtonPresenterWithRestaurant };
