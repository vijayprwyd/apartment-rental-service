export function capitalizeString(string) {
  return `${string.charAt(0)}${string.slice(1).toLowerCase()}`;
}

export function constructQueryParamString(obj) {
  const queryParamObject = {
    page: obj.page,
    minArea: obj.area[0],
    maxArea: obj.area[1],
    minPrice: obj.price[0],
    maxPrice: obj.price[1],
    limit: obj.limit,
  };

  const apartmentTypeString = Object.keys(obj.apartmentTypes)
    .filter((key) => obj.apartmentTypes[key])
    .join("_");

  if (apartmentTypeString)
    queryParamObject.noOfRooms = apartmentTypeString;
  return new URLSearchParams(queryParamObject).toString();
}
