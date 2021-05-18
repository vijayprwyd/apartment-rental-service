export default class ApiFeatures {
  constructor(query, req) {
    this.query = query;
    this.queryObj = req.query;
    this.user = req.user;
  }

  filter(filterQueryBuilder) {
    this.query = this.query.find(filterQueryBuilder(this.queryObj, this.user));
    return this;
  }

  sort(defaultKey) {
    if (this.queryObj.sort) {
      const sortBy = this.queryObj.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort({ [defaultKey]: -1 });
    }
    return this;
  }

  limitFields() {
    if (this.queryObj.fields) {
      const fields = this.queryObj.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryObj.page * 1 || 1;
    const limit = this.queryObj.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
