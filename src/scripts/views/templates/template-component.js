import API_ENDPOINT from '../../global/api-endpoint';

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="detail-container">
    <div class="detail-container__image">
      <img class="detail-image" src="${API_ENDPOINT.IMAGE_MEDIUM + restaurant.pictureId}" role="img" alt="Thumbnail Restoran ${restaurant.name}." crossorigin="anonymous">
    </div>
    <div class="detail-container__content">
      <h2 class="detail-content__title" aria-label="Nama Restoran, ${restaurant.name}." tabindex="0">${restaurant.name}</h2>
      <table class="detail-content__info">
        <tr">
          <td><p><i class="fas fa-tags"></i> Categories </p></td>
          <td> : </td>
          <td>
            <p>${restaurant.categories.map((category) => `
              <span tabindex="0" aria-label="Kategori restoran ${category.name}">${category.name}</span>`).join(', ')}
            </p>
          </td>
        </tr>
        <tr>
          <td><p><i class="fas fa-map-marked-alt"></i> Location </p></td>
          <td> : </td>
          <td><p aria-label="Lokasi Restoran, ${restaurant.city}." tabindex="0">${restaurant.city}</p></td>
        </tr>
        <tr>
          <td><p><i class="fas fa-map-marker-alt"></i> Address </p></td>
          <td> : </td>
          <td><p aria-label="Alamat Restoran, ${restaurant.address}." tabindex="0">${restaurant.address}</p></td>
        </tr>
        <tr>
          <td><p><i class="fas fa-star"></i> Rating </p></td>
          <td> : </td>
          <td><p aria-label="Rating, ${restaurant.rating}." tabindex="0">${restaurant.rating}</p></td>
        </tr>
      </table>
    </div>
    <div class="detail-content__description">
      <h2>Description</h2>
      <p aria-label="Deskripsi Restoran, ${restaurant.description}." tabindex="0">${restaurant.description}</p>
    </div>
  </div>
  <div class="detail-content__menu">
    <div class="detail-content__menu__menu-content">
      <h2 aria-label="Menu Makanan." tabindex="0">Food's Menu</h2>
      <div class="menu-wrapper">
        ${restaurant.menus.foods.map((food) => `
          <div class="menu-wrapper__list">
            <img src="./images/food-large.jpg"
              srcset="./images/food-small.jpg 480w, ./images/food-large.jpg 800w"
              sizes="(max-width: 600px) 480px, 800px"
              alt="Food Menu Avatar">
            </img>
            <p aria-label="${food.name}." tabindex="0">${food.name}</p>
          </div>`).join('')}
      </div>
    </div>
    <div class="detail-content__menu__menu-content">
      <h2 aria-label="Menu Minuman" tabindex="0">Drink's Menu</h2>
      <div class="menu-wrapper">
        ${restaurant.menus.drinks.map((drink) => `
          <div class="menu-wrapper__list">
          <img src="./images/drink-large.jpg"
            srcset="./images/drink-small.jpg 480w, ./images/drink-large.jpg 800w"
            sizes="(max-width: 600px) 480px, 800px"
            alt="Drink Menu Avatar">
          </img>
            <p aria-label="${drink.name}" tabindex="0">${drink.name}</p>
            </div>`).join('')}
      </div>
    </div>
  </div>
  <div class="detail-review">
    <h2>Review</h2>
    <div class="detail-review__content">
      <div class="detail-review__list">
      <ul>
      ${restaurant.customerReviews.map((consumerReview) => `
        <li class="review-list">
          <img src="./images/avatar-large.jpg"
            srcset="./images/avatar-small.jpg 480w, ./images/avatar-large.jpg 800w"
            sizes="(max-width: 600px) 480px, 800px" 
            class="review-list__image" 
            alt="Avatar Reviewer Account">
          </img> 
          <div style="display: inline-block; vertical-align:middle">
            <p class="review-list__reviewerName">${consumerReview.name}</p>
            <p><i>${consumerReview.date}</i></p>
          </div>
          <p class="review-list__description">${consumerReview.review}</p>
        </li>`).join('')}
      </ul>
      </div>
      <div class="detail-review__form">
        <p aria-label="Masukkan Review Kamu">Write Your Review</p>
        <input type="hidden" name="user[id]" id="restaurantId" value="${restaurant.id}">
        <input type="text" name="user[name]" id="inputName" class="form-input" placeholder="Nama" aria-label="Input Nama.">
        <input type="text" name="user[review]" id="inputReview" class="form-input" placeholder="Review" aria-label="Input Review.">
        <button id="btnSubmit" aria-label="Button Kirimkan Review.">Submit</button>
      </div>
    </div>
  </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="Like this Restaurant." id="likeButton" class="like" tabindex="0">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="Unlike this Restaurant." id="likeButton" class="like" tabindex="0">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
