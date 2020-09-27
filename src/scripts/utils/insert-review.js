import API_ENDPOINT from '../global/api-endpoint';

const InsertReview = {
  async init({ insertButton, review }) {
    this._insertButton = insertButton;
    this._review = review;

    await this._getReview();
  },

  async _getReview() {
    this._insertButton.addEventListener('click', () => {
      this._sendReview();
    });
  },

  async _sendReview() {
    const response = await fetch(`${API_ENDPOINT.INSERT_REVIEW}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      },
      body: JSON.stringify(this._review),
    });
    const responseJson = await response.json();
    return responseJson;
  },
};

export default InsertReview;
