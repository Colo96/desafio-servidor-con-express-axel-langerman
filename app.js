const ProductManager = require('./manager/ProductManager');
const manager = new ProductManager('./data/Productos.json');

const express = require('express');
const app = express();
const PORT = 8080;

//Para probar borrar los /**/ de uno y comentar el otro, ya que los dos sin comentar no me funcionan y no se como solucionarlo.

app.get('/products/:limit', async (req, res) => {
    let products = await manager.consultarProductos();
    let limit = req.params.limit;
    if (limit > products.length) {
        res.send("No hay tantos productos");
        return;
    } else if (limit <= 0) {
        res.send("No puede haber cero o menos productos");
        return;
    }
    let filterProducts = products.filter(product => product.id <= limit);
    res.send(filterProducts);
});

/*app.get('/products/:pid', async (req, res) => {
    let products = await manager.consultarProductos();
    let pid = req.params.pid;
    let findProduct = products.find(product => product.id == pid);
    res.send(findProduct);
});*/

app.listen(PORT, () => console.log("Servidor arriba en el puerto 8080!"));
