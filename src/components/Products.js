import React from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import data from '../data';
import { tienda } from '../utils/Store';
import appFirebase from '../credenciales';
import { useContext } from 'react';

export const Products = () => {
  const basedatos = getFirestore(appFirebase);
  const { state, dispatch } = useContext(tienda);

  const { cart: { cartItems } } = state;

  const addToCart = (id) => {
    const product = data.products.find((x) => x.id === id);
    const existItem = state.cart.cartItems.find((x) => x.id === product.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
  };

  const delToCart = (id) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: id });
  };

  const saveInfo = async () => {
    try {
      await addDoc(collection(basedatos, 'compras'), {
        ...arreglo,
        subtotal,
      });
    } catch (error) {
      alert('Error');
      console.log(error);
    }
    dispatch({ type: 'REMOVE_CART' });
    alert('Se envió tu pedido');
  };

  const subtotal = cartItems.reduce((a, c) => a + c.quantity * c.precio, 0);
  const arreglo = cartItems;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 mt-4">
          <div className="card pago">
            <h3 className="text-center">Accio productos</h3>
            {cartItems.map((item) => (
              <div key={item.id}>
                <p>
                  <strong>{item.name}</strong>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => delToCart(item.id)}
                  >
                    Remover
                  </button>
                </p>
                <p>Cantidad: {item.quantity}</p>
              </div>
            ))}

            <div>
              Subtotal: ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
              {cartItems.reduce((a, c) => a + c.quantity * c.precio, 0)}
            </div>

            {cartItems.length ? (
              <button className="btn btn-success mt-3" onClick={saveInfo}>
                Solicitar preventa
              </button>
            ) : (
              <button className="btn btn-secondary mt-3" disabled>
                Solicitar preventa
              </button>
            )}
          </div>
        </div>

        <div className="col-md-8">
          <h1 className="text-center mt-4 mb-5">HOGSMEADE</h1>
          <div className="row row-cols-1 row-cols-md-2 g-3">
            {data.products.map((product) => (
              <div key={product.id} className="col">
                <div className="card">
                  <img
                    src={product.image}
                    alt=""
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h3 className="card-title">{product.name}</h3>
                    <h5 className="card-text">{product.precio}$</h5>
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(product.id)}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;