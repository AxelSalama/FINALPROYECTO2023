const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    // Crear un nuevo CarritoDeCompras con enUso establecido en true
    const newCarrito = await prisma.carritoDeCompras.create({
      data: {
      },
    });

    console.log('Nuevo carrito de compras creado:', newCarrito);

    // Verificar si el carrito fue creado correctamente
    if (newCarrito) {
      console.log('Carrito creado exitosamente.');

      // Puedes realizar otras operaciones relacionadas con el carrito aquí si es necesario

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