const itActsAsFavouriteRestaurantModel = (favouriteRestaurant) => {
  it('should return the restaurant that has been added', async () => {
    favouriteRestaurant.putRestaurant({ id: 1 });
    favouriteRestaurant.putRestaurant({ id: 2 });

    expect(await favouriteRestaurant.getRestaurant(1)).toEqual({ id: 1 });
    expect(await favouriteRestaurant.getRestaurant(2)).toEqual({ id: 2 });
    expect(await favouriteRestaurant.getRestaurant(3)).toEqual(undefined);
  });

  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    favouriteRestaurant.putRestaurant({ aProperty: 'property' });

    expect(await favouriteRestaurant.getAllRestaurant()).toEqual([]);
  });

  it('can return all of the list restaurant that have been added', async () => {
    favouriteRestaurant.putRestaurant({ id: 1 });
    favouriteRestaurant.putRestaurant({ id: 2 });

    expect(await favouriteRestaurant.getAllRestaurant())
      .toEqual([
        { id: 1 },
        { id: 2 },
      ]);
  });

  it('should remove favourite restaurant', async () => {
    favouriteRestaurant.putRestaurant({ id: 1 });
    favouriteRestaurant.putRestaurant({ id: 2 });
    favouriteRestaurant.putRestaurant({ id: 3 });

    await favouriteRestaurant.deleteRestaurant(1);

    expect(await favouriteRestaurant.getAllRestaurant())
      .toEqual([
        { id: 2 },
        { id: 3 },
      ]);
  });

  it('should handle request to remove a restaurant even though the restaurant has not been added', async () => {
    favouriteRestaurant.putRestaurant({ id: 1 });
    favouriteRestaurant.putRestaurant({ id: 2 });
    favouriteRestaurant.putRestaurant({ id: 3 });

    await favouriteRestaurant.deleteRestaurant(4);

    expect(await favouriteRestaurant.getAllRestaurant())
      .toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ]);
  });
};

export { itActsAsFavouriteRestaurantModel };
