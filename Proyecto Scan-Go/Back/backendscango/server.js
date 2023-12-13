const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 9000;

// Configurar middleware para analizar datos JSON en las solicitudes
app.use(express.json());

const prisma = new PrismaClient();

// Ruta GET: Obtener todos los carritos
app.get('/api/carritos', async (req, res) => {
  try {
    const carritos = await prisma.carritoDeCompras.findMany();

    res.status(200).json({ data: carritos });
  } catch (error) {
    console.error('Error al obtener los carritos', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta GET: Obtener información de todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.producto.findMany();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener información de productos:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});

// Ruta GET: Obtener un carrito específico con sus items
app.get('/api/carritos/:carritoId', async (req, res) => {
  try {
    const { carritoId } = req.params;

    const carrito = await prisma.carritoDeCompras.findUnique({
      where: {
        id: parseInt(carritoId, 10),
      },
      include: {
        items: true,
      },
    });

    if (carrito) {
      res.status(200).json({ data: carrito });
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener un carrito específico', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// Ruta POST: Insertar nuevo producto
app.post('/api/products', async (req, res) => {
  try {
    console.log(req.body);
    const { nombre, precio, peso, carritoId } = req.body;

    // Utiliza el cliente Prisma para insertar un nuevo producto en la base de datos
    const newProduct = await prisma.producto.create({
      data: {
        nombre,
        precio,
        peso,
        carritoId,
      },
    });

    res.json({ message: 'Producto insertado correctamente', data: newProduct });
  } catch (error) {
    console.error('Error al insertar producto:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
});

// Ruta POST: Agregar un producto existente a un carrito
app.post('/api/carritos/:carritoId/items/:productoId', async (req, res) => {
  try {
    const { carritoId, productoId } = req.params;

    // Verificar si el carrito y el producto existen
    const carrito = await prisma.carritoDeCompras.findUnique({
      where: {
        id: parseInt(carritoId, 10),
      },
    });

    const producto = await prisma.producto.findUnique({
      where: {
        id: parseInt(productoId, 10),
      },
    });

    if (!carrito || !producto) {
      res.status(404).json({ error: 'Carrito o producto no encontrado' });
      return;
    }

    // Conectar el producto al carrito
    const updatedCarrito = await prisma.carritoDeCompras.update({
      where: {
        id: parseInt(carritoId, 10),
      },
      data: {
        items: {
          connect: {
            id: parseInt(productoId, 10),
          },
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json({ message: 'Producto añadido al carrito exitosamente', data: updatedCarrito });
  } catch (error) {
    console.error('Error al agregar un producto al carrito', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta DELETE: Eliminar un producto de un carrito
app.delete('/api/carritos/:carritoId/items/:itemId', async (req, res) => {
  try {
    const { carritoId, itemId } = req.params;

    await prisma.producto.delete({
      where: {
        id: parseInt(itemId, 10),
        carritoId: parseInt(carritoId, 10),
      },
    });

    res.status(200).json({ message: 'Producto eliminado del carrito exitosamente' });
  } catch (error) {
    console.error('Error al eliminar un producto del carrito', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});