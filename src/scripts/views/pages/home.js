import '../../component/restaurant-list';
import RestaurantApi from '../../data/restaurant-api';
import hideLoader from '../../utils/loader-initiator';

const Home = {
  async render() {
    return `
      <div class="content">
        <h1 class="content__label" tabindex="0">Explore Restaurant</h1>
        <div id="loader">
          <div class="loader-ring"></div>
        </div>
        <restaurant-list class="post-wrapper animate-from-bottom"></restaurant-list>
      </div>
    `;
  },

  async afterRender() {
    const restaurantsContainer = document.querySelector('restaurant-list');
    try {
      const result = await RestaurantApi.listRestaurant();
      if (result) {
        hideLoader();
      }
      restaurantsContainer.restaurants = result;
    } catch {
      restaurantsContainer.innerHTML += '<h2 class="error-message"> Data tidak tersedia pada offline mode </h2>';
    }
  },

  _hideLoader() {
    document.querySelector('#loader').style.display = 'none';
  },
};

export default Home;
