import API_ENDPOINT from '../global/api-endpoint';

class RestaurantItem extends HTMLElement {
  /**
   * @param {any} restaurant
   */
  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this.render();
  }

  render() {
    this.innerHTML = `
      <a href="${`/#/detail/${this._restaurant.id}`}">
        <img class="post__thumbnail" src="${API_ENDPOINT.IMAGE_MEDIUM + this._restaurant.pictureId}" role="img" alt="Thumbnail Restoran ${this._restaurant.name}." crossorigin="anonymous">
      </a>
      <div class="post-content">
        <h1 class="post-content__title" aria-label="Nama Restoran, ${this._restaurant.name}."><a href="${`/#/detail/${this._restaurant.id}`}">${this._restaurant.name}</a></h1>
        <p class="post-content__place" aria-label="Lokasi, ${this._restaurant.city}."><i class="fas fa-map-marker-alt"></i> ${this._restaurant.city}</p>
        <div class="post-content__rating">
          <div class="rating__outer">
            <div class="rating__inner" style="width: ${(this._restaurant.rating / 5) * 100}%"></div>
          </div>
          <span aria-label="Rating, ${this._restaurant.rating} dari 5.">${this._restaurant.rating}</span>
        </div>
        <p class="post-content__description" aria-label="Deskripsi, ${this._restaurant.description}".>${this._restaurant.description}</p>
      </div>
    `;
  }
}

customElements.define('restaurant-item', RestaurantItem);
