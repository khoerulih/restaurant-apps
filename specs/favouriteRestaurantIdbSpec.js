import { itActsAsFavouriteRestaurantModel } from './contract/favouriteRestaurantContract';
import FavouriteRestaurant from '../src/scripts/data/favourite-restaurant';

describe('Favourite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavouriteRestaurant.getAllRestaurant()).forEach(async (restaurant) => {
      await FavouriteRestaurant.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsFavouriteRestaurantModel(FavouriteRestaurant);
});
