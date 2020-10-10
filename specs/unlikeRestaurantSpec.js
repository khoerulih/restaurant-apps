import FavouriteRestaurant from '../src/scripts/data/favourite-restaurant';
import * as TestFactories from './helpers/testFactories';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('When Unliking a Restaurant', () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavouriteRestaurant.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavouriteRestaurant.deleteRestaurant(1);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="Unlike this Restaurant."]')).toBeTruthy();
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="Like this Restaurant."]')).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('[aria-label="Unlike this Restaurant."]').dispatchEvent(new Event('click'));
    expect(await FavouriteRestaurant.getAllRestaurant()).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not on the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    await FavouriteRestaurant.deleteRestaurant(1);

    document.querySelector('[aria-label="Unlike this Restaurant."]').dispatchEvent(new Event('click'));

    expect(await FavouriteRestaurant.getAllRestaurant()).toEqual([]);
  });
});
