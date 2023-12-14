const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Crear un nuevo CarritoDeCompras con enUso establecido en true
    const newCarrito = await prisma.carritoDeCompras.create({
      data: {
        items: {
          create: [{
            nombre: "Papas fritas",
            precio: 300,
            peso: 315,
          }],
        },
      },
    });

    console.log('Nuevo carrito de compras creado:', newCarrito);

    // Verificar si el carrito fue creado correctamente
    if (newCarrito) {
      console.log('Carrito creado exitosamente.');

      // Obtener el ID del nuevo carrito
      const carritoId = newCarrito.id;

      // Asociar el producto al carrito
      const newProducto = await prisma.producto.create({
        data: {
          nombre: "Papas fritas",
          precio: 300,
          peso: 315,
          carritoId: carritoId,
        },
      });

      console.log('Producto añadido al carrito:', newProducto);
    } else {
      console.log('Error al crear el carrito de compras.');
    }
  } catch (error) {
    console.error('Error al crear un nuevo carrito de compras', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Llamar a la función para insertar datos
main();