// ===== LOS PELADOS II - Backend con SoqueTIC =====

import { startServer, subscribeGETEvent, subscribePOSTEvent } from "soquetic";
import fs from "fs";

// Helpers para leer / escribir JSON en ../data
function leerJson(nombreArchivo) {
  // estoy en backend/, data está al lado de backend => ../data
  const texto = fs.readFileSync("../data/" + nombreArchivo, "utf8");
  return JSON.parse(texto);
}

function guardarJson(nombreArchivo, data) {
  const texto = JSON.stringify(data, null, 2);
  fs.writeFileSync("../data/" + nombreArchivo, texto, "utf8");
}

// ========== GET "sabores" ==========
subscribeGETEvent("sabores", () => {
  try {
    const sabores = leerJson("sabores.json");
    return sabores;
  } catch (err) {
    console.log("Error leyendo sabores:", err.message);
    return [];
  }
});

// ========== GET "productos" ==========
subscribeGETEvent("productos", () => {
  try {
    const productos = leerJson("productos.json");
    return productos;
  } catch (err) {
    console.log("Error leyendo productos:", err.message);
    return [];
  }
});

// ========== POST "pedido" ==========
subscribePOSTEvent("pedido", (data) => {
  try {
    const listaPedidos = leerJson("pedidos.json"); // array
    listaPedidos.push(data);
    guardarJson("pedidos.json", listaPedidos);

    console.log("Pedido guardado:", data);
    return { ok: true };
  } catch (err) {
    console.log("Error guardando pedido:", err.message);
    return { ok: false };
  }
});

// ========== INICIAR SERVIDOR ==========
startServer(3000, false);
console.log("Servidor LOS PELADOS II escuchando en puerto 3000");
