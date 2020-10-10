import { itActsAsFavouriteRestaurantModel } from './contract/favouriteRestaurantContract';

let favouriteRestaurant = [];

const FavouriteRestaurantArray = {
  getRestaurant(id) {
    if (!id) {
      return;
    }

    return favouriteRestaurant.find((restaurant) => restaurant.id === id);
  },

  getAllRestaurant() {
    return favouriteRestaurant;
  },

  putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    if (this.getRestaurant(restaurant.id)) {
      return;
    }

    favouriteRestaurant.push(restaurant);
  },

  deleteRestaurant(id) {
    favouriteRestaurant = favouriteRestaurant.filter((restaurant) => restaurant.id !== id);
  },
};

describe('Favourite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => favouriteRestaurant = []);

  itActsAsFavouriteRestaurantModel(FavouriteRestaurantArray);
});
