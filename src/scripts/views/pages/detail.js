import UrlParser from '../../routes/url-parser';
import RestaurantApi from '../../data/restaurant-api';
import FavouriteRestaurant from '../../data/favourite-restaurant';
import { createRestaurantDetailTemplate } from '../templates/template-component';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import hideLoader from '../../utils/loader-initiator';
import toastInitiator from '../../utils/toast-initiator';
import API_ENDPOINT from '../../global/api-endpoint';

const Detail = {
  async render() {
    return `
      <div class="content">
        <h1 class="content__label" tabindex="0">Detail Restaurant</h1>
        <div id="loader">
          <div class="loader-ring"></div>
        </div>
        <div class="detail-wrapper animate-from-bottom" id="detail-restaurant">
        
        </div>
        <div id="likeButtonContainer"></div>
        <div id="toast"></div>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantContainer = document.querySelector('#detail-restaurant');
    let restaurant;
    try {
      restaurant = await RestaurantApi.detailRestaurant(url.id);
      if (restaurant) {
        hideLoader();
      }
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
      const buttonSubmit = document.querySelector('#btnSubmit');
      const restaurantId = document.querySelector('#restaurantId');
      const senderName = document.querySelector('#inputName');
      const senderReview = document.querySelector('#inputReview');
      buttonSubmit.addEventListener('click', () => {
        const review = {
          id: restaurantId.value,
          name: senderName.value,
          review: senderReview.value,
        };
        this._sendReview(review);
        senderName.value = '';
        senderReview.value = '';
      });
    } catch {
      hideLoader();
      if (await FavouriteRestaurant.getRestaurant(url.id)) {
        restaurant = await FavouriteRestaurant.getRestaurant(url.id);
        restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
      } else {
        restaurantContainer.innerHTML = '<h2 class="error-message"> Data tidak tersedia </h2>';
      }
    }
    this._likeButtonInit(restaurant);
  },

  async _likeButtonInit(data) {
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: data.id,
        name: data.name,
        description: data.description,
        city: data.city,
        address: data.address,
        pictureId: data.pictureId,
        rating: data.rating,
        categories: data.categories,
        menus: data.menus,
        consumerReviews: data.consumerReviews,
      },
      toastContainer: document.querySelector('#toastContainer'),
    });
  },

  async _sendReview(review) {
    try {
      const response = await fetch(`${API_ENDPOINT.INSERT_REVIEW}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': '12345',
        },
        body: JSON.stringify(review),
      });
      const responseJson = await response.json();
      console.log(responseJson.message);
      if (responseJson.message === 'success') {
        toastInitiator('Success, Your review has been sended');
      } else {
        toastInitiator(`${responseJson.message}`);
      }
    } catch {
      toastInitiator('Failed to send review');
    }
  },
};

export default Detail;
