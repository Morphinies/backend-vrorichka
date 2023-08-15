import User from "./User.js";

class UserService {
    // get all users
    async getAll() {
        const users = await User.find({});
        return users;
    }

    // get by id logic
    async getById(id) {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("Пользователь не найден!");
        } else {
            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                about: user.about,
                avatar: user.avatar,
                products: user.products,
                favorites: user.favorites,
                password: user.password,
            };
        }
    }

    // edit logic
    async edit(form) {
        const id = form._id;
        const updUser = form;
        delete updUser._id;
        const user = await User.findByIdAndUpdate(id, updUser, { new: true });
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            about: user.about,
            avatar: user.avatar,
            products: user.products,
            favorites: user.favorites,
        };
    }

    //edit favorites logic
    async editFavorites(data) {
        const userId = data.userId;
        const prodId = data.prodId;
        const user = await User.findById(userId);
        const favoritesList = user.favorites;
        if (user) {
            if (user.favorites.includes(prodId)) {
                const indexOfProd = user.favorites.indexOf(prodId);
                favoritesList.splice(indexOfProd, 1);
            } else {
                favoritesList.push(prodId);
            }
            const updUser = await User.findByIdAndUpdate(
                userId,
                { ...user, favorites: favoritesList },
                { new: true }
            );
            return updUser.favorites;
        }
    }

    // logup logic
    async logup(form) {
        const login = form.login;
        const password = form.password;
        const user = await User.findOne({ email: login, password: password });
        if (!user) {
            throw new Error("Неправильный логин/пароль");
        }
        return { name: user.name, _id: user._id };
    }

    // registration logic
    async signup(form) {
        const emailBusy = await User.findOne({ email: form.email });
        if (emailBusy) {
            throw new Error("Пользователь с этой почтой уже зарегистрирован!");
        }
        const registeredUser = await User.create({
            ...form,
            avatar: "",
            phone: "",
            about: "",
            products: [],
            favorites: [],
        });
        return registeredUser._id;
    }
}

export default new UserService();
