import './restaurant-item';

class RestaurantList extends HTMLElement {
  /**
   * @param {any} restaurants
   */
  set restaurants(restaurants) {
    this._restaurants = restaurants;
    this.render();
  }

  render() {
    this.innerHTML = '';
    this._restaurants.forEach((restaurant) => {
      const restaurantItemElement = document.createElement('restaurant-item');
      restaurantItemElement.restaurant = restaurant;
      restaurantItemElement.className = 'post';
      restaurantItemElement.tabIndex = '0';
      this.appendChild(restaurantItemElement);
    });
  }
}

customElements.define('restaurant-list', RestaurantList);
