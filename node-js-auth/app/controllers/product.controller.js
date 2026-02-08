const db = require("../models");
const Product = db.product;

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.seedProducts = async () => {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            const products = [
                {
                    name: "Смартфон Pro X",
                    category: "smartphones",
                    price: 75000,
                    rating: 5,
                    image: "assets/samsung.jpg",
                    specs: { ram: "8GB", storage: "256GB", battery: "5000mAh" },
                },
                {
                    name: "Ноутбук UltraBook 15",
                    category: "laptops",
                    price: 120000,
                    rating: 5,
                    image: "assets/ultrabook.jpg",
                    specs: { cpu: "Intel i7", ram: "16GB", storage: "512GB SSD" },
                },
                {
                    name: "Наушники SoundWave",
                    category: "accessories",
                    price: 15000,
                    rating: 4,
                    image: "assets/soundwave.jpg",
                    specs: { type: "Bluetooth", battery: "30h", color: "черный" },
                },
                {
                    name: "Iphone 17",
                    category: "smartphones",
                    price: 95000,
                    rating: 5,
                    image: "assets/iphone17.jpg",
                    specs: { ram: "12GB", storage: "512GB", battery: "5500mAh" },
                },
                {
                    name: "Apple MacBook Air",
                    category: "laptops",
                    price: 85000,
                    rating: 4,
                    image: "assets/macbook.jpg",
                    specs: { cpu: "AMD Ryzen 7", ram: "8GB", storage: "256GB SSD" },
                },
                {
                    name: "USB-C кабель",
                    category: "accessories",
                    price: 2000,
                    rating: 4,
                    image: "assets/usbcabel.jpg",
                    specs: { length: "2m", type: "USB 3.0", color: "белый" },
                },
            ];

            await Product.insertMany(products);
            console.log("Products seeded successfully!");
        }
    } catch (err) {
        console.error("Seeding error:", err);
    }
};
