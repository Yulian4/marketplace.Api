"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveProduct = exports.getAdminProducts = exports.getUserProducts = exports.addProduct = void 0;
// Simulación de base de datos
let products = [];
// Añadir un producto
const addProduct = (req, res) => {
    const { name, description, price, user } = req.body;
    if (!name || !description || !price || !user) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }
    const newProduct = {
        name,
        description,
        price,
        status: 'pending',
        user,
    };
    products.push(newProduct);
    return res.status(201).json({ message: 'Producto agregado exitosamente', product: newProduct });
};
exports.addProduct = addProduct;
// Obtener los productos de un usuario
const getUserProducts = (req, res) => {
    const { username } = req.params;
    const userProducts = products.filter(p => p.user === username);
    if (userProducts.length === 0) {
        return res.status(404).json({ message: `No se encontraron productos para el usuario: ${username}` });
    }
    return res.status(200).json(userProducts);
};
exports.getUserProducts = getUserProducts;
// Obtener productos pendientes para admin
const getAdminProducts = (req, res) => {
    const pendingProducts = products.filter(p => p.status === 'pending');
    if (pendingProducts.length === 0) {
        return res.status(404).json({ message: 'No hay productos pendientes' });
    }
    return res.status(200).json(pendingProducts);
};
exports.getAdminProducts = getAdminProducts;
// Aprobar un producto por ID
const approveProduct = (req, res) => {
    const { productId } = req.params;
    const product = products.find(p => p.name === productId); // Aquí debe ser por `id`, no `name`
    if (product) {
        product.status = 'approved';
        return res.status(200).json({ message: 'Producto aprobado', product });
    }
    else {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
};
exports.approveProduct = approveProduct;
