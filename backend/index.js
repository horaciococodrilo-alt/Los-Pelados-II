

import { startServer, subscribeGETEvent, subscribePOSTEvent } from "soquetic";
import fs from "fs";

function leerJson(nombreArchivo) {

  const texto = fs.readFileSync("../data/" + nombreArchivo, "utf8");
  return JSON.parse(texto);
}

function guardarJson(nombreArchivo, data) {
  const texto = JSON.stringify(data, null, 2);
  fs.writeFileSync("../data/" + nombreArchivo, texto, "utf8");
}

subscribeGETEvent("sabores", () => {
  try {
    const sabores = leerJson("sabores.json");
    return sabores;
  } catch (err) {
    console.log("Error leyendo sabores:", err.message);
    return [];
  }
});

subscribeGETEvent("productos", () => {
  try {
    const productos = leerJson("productos.json");
    return productos;
  } catch (err) {
    console.log("Error leyendo productos:", err.message);
    return [];
  }
});

subscribePOSTEvent("pedido", (data) => {
  try {
    const listaPedidos = leerJson("pedidos.json"); 
    listaPedidos.push(data);
    guardarJson("pedidos.json", listaPedidos);

    console.log("Pedido guardado:", data);
    return { ok: true };
  } catch (err) {
    console.log("Error guardando pedido:", err.message);
    return { ok: false };
  }
});

startServer(3000, false);
console.log("Servidor LOS PELADOS II escuchando en puerto 3000");
