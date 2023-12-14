const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Crear un nuevo CarritoDeCompras con enUso establecido en true
    const newCarrito = await prisma.carritoDeCompras.create({
      {
        "data": {
          "id": 3, // CarritoDeCompras ID
          "items": [
            {
              "id": 2,
              "nombre": "Confites Rocklets",
              "precio": 180,
              "peso": 100,
              "carritoId": 3
            },
            {
              "id": 3,
              "nombre": "Confites Rocklets",
              "precio": 180,
              "peso": 100,
              "carritoId": 3
            },
            {
              "id": 4,
              "nombre": "Confites Rocklets",
              "precio": 180,
              "peso": 100,
              "carritoId": 3
            },
            {
              "id": 5,
              "nombre": "Papas fritas",
              "precio": 300,
              "peso": 315,
              "carritoId": 3
            }
          ]
        }
      }
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