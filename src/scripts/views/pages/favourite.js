import FavouriteRestaurant from '../../data/favourite-restaurant';

const Favourite = {
  async render() {
    return `
      <div class="content">
        <h1 class="content__label" tabindex="0">Your Favourite Restaurant</h1>
        <restaurant-list class="post-wrapper animate-from-bottom"></restaurant-list>
      </div>
    `;
  },

  async afterRender() {
    const restaurantsContainer = document.querySelector('restaurant-list');
    try {
      const result = await FavouriteRestaurant.getAllRestaurant();
      if (result.length > 0) {
        restaurantsContainer.restaurants = result;
      } else {
        restaurantsContainer.innerHTML = '<h2 class="error-message"> There`s no favourite restaurant found </h2>';
      }
    } catch {
      restaurantsContainer.innerHTML = '<h2 class="error-message"> Sorry, This page can`t be accessed in offline mode </h2>';
    }
  },
};

export default Favourite;
