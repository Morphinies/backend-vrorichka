import Router from "express";
import ProdController from "./ProdController.js";
const prodRouter = new Router();

// all products
prodRouter.get("", ProdController.getAll);

// favorite products

prodRouter.post("/favorites", ProdController.getFavorites);

// product by ID
prodRouter.get("/:id", ProdController.getById);

// product by ID
prodRouter.delete("/:id", ProdController.deleteById);

// product by SellerID
prodRouter.get("/bySeller/:userID", ProdController.getBySellerId);

// products by name
prodRouter.get("/byName/:name", ProdController.getByName);

// edit product
prodRouter.put("/editProd", ProdController.edit);

// create product
prodRouter.post("/addProd", ProdController.create);

export default prodRouter;
