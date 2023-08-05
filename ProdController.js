import ProdService from "./ProdService.js";

class ProdController {
    //
    async create(req, res) {
        try {
            if (!req.body) return res.status(400);
            console.log(req.body);
            const product = await ProdService.create(req.body);
            res.send(product);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    //
    async getAll(req, res) {
        try {
            const searchParams = req.query;
            const products = await ProdService.getAll(searchParams);
            res.send(products);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    //
    async getFavorites(req, res) {
        try {
            if (!req.body) return res.status(400);
            const favoritesProdList = await ProdService.getFavorites(req.body);
            if (favoritesProdList) res.send(favoritesProdList);
            else res.status(404);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    //
    async getById(req, res) {
        try {
            const product = await ProdService.getById(req.params);
            if (product) res.send(product);
            else if (product === null) {
                res.json(null);
            } else res.status(404);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    //
    async deleteById(req, res) {
        try {
            console.log(req.params);
            const product = await ProdService.deleteById(req.params);
            if (product) res.send(product);
            else if (product === null) {
                res.json(null);
            } else res.status(404);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
    //
    async getBySellerId(req, res) {
        try {
            const products = await ProdService.getBySellerId(req.params);
            if (products) res.send(products);
            else res.status(404);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    //
    async getByName(req, res) {
        try {
            const products = await ProdService.getByName(req.params);
            if (products) res.send(products);
            else res.status(404);
        } catch (e) {
            res.status(500).json(e);
        }
    }
    //
    async edit(req, res) {
        try {
            if (!req.body) return res.status(400);
            const product = await ProdService.edit(req.body);
            if (product) res.send(product);
            else res.status(404);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new ProdController();
