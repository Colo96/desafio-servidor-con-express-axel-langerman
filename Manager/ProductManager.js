const fs = require('fs/promises');
const { existsSync } = require('fs');

class ProductManager {

    static idCounter = 0;

    constructor(path) {
        this.path = path;
    }

    async consultarProductos() {
        if (existsSync(this.path)) {
            const data = await fs.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            return products;
        } else {
            return [];
        }
    }

    async addProduct(producto) {
        const products = await this.consultarProductos();
        if (!products.length) {
            ProductManager.idCounter = 1;
        } else {
            ProductManager.idCounter = products[products.length - 1].id + 1;
        }
        const newProduct = {
            id: ProductManager.idCounter,
            ...producto
        }
        products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return newProduct;
    }

    async getProducts() {
        const products = await this.consultarProductos();
        products.map(product => {
            console.log(product);
        });
    }

    async getProductsById(id) {
        const products = await this.consultarProductos();
        products.find(product => {
            if (product.id === id) {
                console.log("Obtengo el producto por id");
                console.log(product);
            }
        });
    }

    async updateProduct(id, newProduct) {
        const products = await this.consultarProductos();
        const updateProducts = products.map(product => product.id === id ? {
            id: id,
            title: newProduct.title,
            description: newProduct.description,
            price: newProduct.price,
            thumbnail: newProduct.thumbnail,
            code: newProduct.code,
            stock: newProduct.stock
        } : product);
        await fs.writeFile(this.path, JSON.stringify(updateProducts, null, '\t'));
        console.log("Producto actualizado: ", newProduct);
    }

    async deleteProduct(id) {
        const products = await this.consultarProductos();
        const filterProducts = products.filter(product => product.id !== id);
        await fs.writeFile(this.path, JSON.stringify(filterProducts, null, '\t'));
        console.log("Productos filtrados: ", filterProducts);
    }
}

module.exports = ProductManager;