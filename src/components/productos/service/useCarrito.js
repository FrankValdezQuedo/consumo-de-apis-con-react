import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useCart } from "../../contexto/CardContext";
import Swal from "sweetalert2";

// Constantes para mensajes y URLs
const ERROR_MESSAGES = {
    LOAD: "No pudimos cargar tus productos. Por favor intenta más tarde.",
    EMPTY_CART: "No se pudieron cargar los productos del carrito.",
    PAYMENT: "Ocurrió un problema al procesar el pago"
};

const API_URL = "https://fakestoreapi.com/products";

export const useCarrito = () => {
    const [state, setState] = useState({
        productos: [],
        cargando: true,
        error: null,
        carritoVacio: false,
        procesandoPago: false
    });

    const { removeFromCart, setCarrito } = useCart();

    // Cargar productos del carrito
    const cargarProductos = useCallback(async () => {
        setState(prev => ({ ...prev, cargando: true, error: null }));

        try {
            const idsCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

            if (idsCarrito.length === 0) {
                return setState(prev => ({
                    ...prev,
                    productos: [],
                    carritoVacio: true,
                    cargando: false
                }));
            }

            const productosData = await Promise.all(
                idsCarrito.map(id =>
                    axios.get(`${API_URL}/${id}`)
                        .then(res => ({ ...res.data, cantidad: 1 }))
                        .catch(() => null)
                )
            );

            const productosValidos = productosData.filter(Boolean);

            if (!productosValidos.length) {
                throw new Error(ERROR_MESSAGES.EMPTY_CART);
            }

            setState(prev => ({
                ...prev,
                productos: productosValidos,
                cargando: false
            }));
        } catch (error) {
            console.error("Error al cargar productos:", error);
            setState(prev => ({
                ...prev,
                error: error.message || ERROR_MESSAGES.LOAD,
                cargando: false
            }));
        }
    }, []);

    // Actualizar cantidad de un producto
    const actualizarCantidad = useCallback((id, nuevaCantidad) => {
        if (nuevaCantidad < 1) return;

        setState(prev => ({
            ...prev,
            productos: prev.productos.map(producto =>
                producto.id === id ? { ...producto, cantidad: nuevaCantidad } : producto
            )
        }));
    }, []);

    // Eliminar producto del carrito
    const eliminarProducto = useCallback((id) => {
        setState(prev => {
            const nuevosProductos = prev.productos.filter(p => p.id !== id);
            const nuevosIds = nuevosProductos.map(p => p.id);

            localStorage.setItem("carrito", JSON.stringify(nuevosIds));
            removeFromCart(id);

            return {
                ...prev,
                productos: nuevosProductos,
                carritoVacio: nuevosProductos.length === 0
            };
        });
    }, [removeFromCart]);

    // Calcular el total del carrito
    const calcularTotal = useCallback(() => {
        return state.productos
            .reduce((total, { price, cantidad }) => total + price * cantidad, 0)
            .toFixed(2);
    }, [state.productos]);

    // Procesar el pago
    const pagar = useCallback(async () => {
        if (!state.productos.length) {
            await Swal.fire('Error', 'No hay productos en el carrito', 'error');
            return;
        }

        // Mostrar alerta de confirmación primero
        const result = await Swal.fire({
            title: 'Confirmar compra',
            text: `Total a pagar: $${calcularTotal()}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirmar pago',
            cancelButtonText: 'Cancelar',
        });

        if (!result.isConfirmed) {
            return;
        }

        // Mostrar alerta de procesamiento
        setState(prev => ({ ...prev, procesandoPago: true }));
        Swal.fire({
            title: 'Procesando pago...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            // Simular tiempo de procesamiento
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Limpiar carrito
            localStorage.removeItem('carrito');
            setCarrito([]);

            // Cerrar alerta de procesamiento y mostrar éxito
            Swal.close();
            await Swal.fire(
                '¡Pago exitoso!',
                `Tu compra de $${calcularTotal()} se ha completado.`,
                'success'
            );

            setState({
                productos: [],
                cargando: false,
                error: null,
                carritoVacio: true,
                procesandoPago: false
            });
        } catch (error) {
            console.error('Error en el pago:', error);
            Swal.close();
            await Swal.fire('Error', ERROR_MESSAGES.PAYMENT, 'error');
        } finally {
            setState(prev => ({ ...prev, procesandoPago: false }));
        }
    }, [state.productos, calcularTotal, setCarrito]);

    useEffect(() => {
        cargarProductos();
    }, [cargarProductos]);

    return {
        ...state,
        actualizarCantidad,
        eliminarProducto,
        calcularTotal,
        pagar
    };
};