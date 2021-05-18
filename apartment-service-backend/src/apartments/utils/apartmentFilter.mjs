export default class ApartmentFilter {
  filterQueryBuilder(filterObj, user) {
    let inRooms;
    let minRooms;
    let roomArray;
    if (!filterObj) return {};
    if (filterObj.noOfRooms) {
      roomArray = filterObj.noOfRooms.split('_');
      const index = roomArray && roomArray.indexOf('5+');
      if (index !== undefined && index > -1) {
        roomArray.splice(index, 1);
        minRooms = 5;
      }
      inRooms = roomArray
        .map((num) => parseInt(num, 10))
        .filter((num) => num && !Number.isNaN(num));
    }
    const filterQuery = {
      $and: [
        {
          status:
            user.role === 'CLIENT' ? ['Availiable'] : ['Availiable', 'Rented'],
        },
        {
          ...((filterObj.minPrice || filterObj.maxPrice) && {
            pricePerMonth: {
              ...(filterObj.minPrice && { $gte: filterObj.minPrice }),
              ...(filterObj.maxPrice && { $lte: filterObj.maxPrice }),
            },
          }),
        },
        {
          ...((filterObj.minArea || filterObj.maxArea) && {
            floorAreaSize: {
              ...(filterObj.minArea && { $gte: filterObj.minArea }),
              ...(filterObj.maxArea && { $lte: filterObj.maxArea }),
            },
          }),
        },
        {
          ...((inRooms || minRooms) && {
            $or: [
              {
                ...(inRooms &&
                  inRooms.length && {
                    noOfRooms: {
                      $in: inRooms,
                    },
                  }),
              },
              {
                ...(minRooms && {
                  noOfRooms: {
                    $gte: 5,
                  },
                }),
              },
            ].filter((obj) => Object.keys(obj).length > 0),
          }),
        },
      ],
    };
    return filterQuery;
  }
}
