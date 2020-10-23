const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favourite');
});

Scenario('showing empty favourite restaurant pages', ({ I }) => {
  I.see('There`s no favourite restaurant found', '.error-message');
});

Scenario('like one restaurant and then unlike it', async ({ I }) => {
  I.see('There`s no favourite restaurant found', '.error-message');

  I.amOnPage('/');

  I.seeElement('.post-content__title a');
  const firstRestaurant = locate('.post-content__title a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');

  // check the button is liked button or unliked button
  I.seeElement('[aria-label="Like this Restaurant."]');
  I.click('#likeButton');

  I.amOnPage('/#/favourite');
  I.seeElement('.post-content__title');
  const favouritedRestaurantName = await I.grabTextFrom('.post-content__title a');

  // compare restaurant name that liked in detail pages
  // and restaurant name after liked in favourite pages

  assert.strictEqual(firstRestaurantName, favouritedRestaurantName);

  // unlike restaurant process

  I.click('.post-content__title a');
  I.seeElement('#likeButton');

  // check the button is liked button or unliked button
  I.seeElement('[aria-label="Unlike this Restaurant."]');
  I.click('#likeButton');

  // back to favourite page
  I.amOnPage('/#/favourite');
  I.see('There`s no favourite restaurant found', '.error-message');
});

Scenario('add review', async ({ I }) => {
  I.amOnPage('/');

  I.seeElement('.post-content__title a');
  const firstRestaurant = locate('.post-content__title a').first();
  I.click(firstRestaurant);

  I.seeElement('.detail-review__form');

  const review = 'mantap';
  I.fillField('user[name]', 'BotAsoyyy2.0');
  I.fillField('user[review]', review);

  I.click('#btnSubmit');
  I.seeElement('#toast');

  I.refreshPage();

  I.seeElement('.detail-review__list');
  const recentReview = locate('.review-list__description').last();
  const getRecentReview = await I.grabTextFrom(recentReview);

  assert.strictEqual(review, getRecentReview);
});
