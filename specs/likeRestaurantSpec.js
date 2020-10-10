import FavouriteRestaurant from '../src/scripts/data/favourite-restaurant';
import * as TestFactories from './helpers/testFactories';

describe('When Like A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked yet', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="Like this Restaurant."]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked yet', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="Unlike this Restaurant."]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await FavouriteRestaurant.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });

    FavouriteRestaurant.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    await FavouriteRestaurant.putRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavouriteRestaurant.getAllRestaurant()).toEqual([{ id: 1 }]);

    FavouriteRestaurant.deleteRestaurant(1);
  });

  it('should not add a restaurant when it not have an id', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({});
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavouriteRestaurant.getAllRestaurant()).toEqual([]);
  });
});
