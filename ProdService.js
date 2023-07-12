import Product from "./Product.js";

class ProdService {
  //
  async create(prod) {
    const product = await Product.create({
      ...prod,
      place: "г. Торопец",
      data: new Date(),
    });
    return product;
  }
  //
  async getAll(params) {
    // поиск по имени
    if (params.name) {
      const nameRegExp = new RegExp(`${params.name}`, "i");
      params.name = nameRegExp;
    }
    // фильтрация по цене
    if (params.minPrice || params.maxPrice) {
      const minPrice = params.minPrice;
      const maxPrice = params.maxPrice;
      delete params.minPrice;
      delete params.maxPrice;
      const priceLimit = {};
      if (minPrice) priceLimit.$gte = Number(minPrice.replace(/ /g, ""));
      if (maxPrice) priceLimit.$lte = Number(maxPrice.replace(/ /g, ""));
      params.price = priceLimit;
    }
    // сортировка по цене
    let sorting = { data: -1 };
    if (params.sort) {
      const sortBy = params.sort;
      delete params.sort;
      switch (sortBy) {
        case "с новых":
          sorting = { data: -1 };
          break;
        case "со старых":
          sorting = { data: 1 };
          break;
        case "с дорогих":
          sorting = { price: -1 };
          break;
        case "с дешевых":
          sorting = { price: 1 };
          break;
      }
      // sortBy === "с новых"
      console.log(sortBy);
    }
    // страница товаров !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    delete params.page;

    const products = await Product.find({ ...params }).sort(sorting);
    return products;
  }
  //
  async getById(prod) {
    const id = prod.id;
    const product = await Product.findById(id);
    if (!product) {
      return null;
    }
    return product;
  }
  //
  async deleteById(prod) {
    const id = prod.id;
    const product = await Product.findOneAndDelete({ _id: id });
    if (product) return product;
    else return null;
  }
  //
  async getBySellerId(data) {
    const id = data.userID;
    const products = await Product.find({ seller: id });
    return products;
  }
  //
  async getByName(prod) {
    const prodName = prod.name;
    const regExp = new RegExp(`${prodName}`, "i");
    const products = await Product.find({ name: regExp });
    return products;
  }
  //
  async edit(prod) {
    const id = prod._id;
    const updProd = prod;
    delete updProd._id;
    const product = await Product.findOneAndUpdate({ _id: id }, updProd, {
      new: true,
    });
    return product;
  }
}

export default new ProdService();
