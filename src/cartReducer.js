export default function cartReducer(cart, action) {
  switch (action.type) {
    case "empty":
      return [];
    case "add": {
      const { id, sku } = action;
      const itemsInCart = cart.find((i) => i.sku === sku);
      if (itemsInCart) {
        return cart.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...cart, { id, sku, quantity: 1 }];
      }
    }
    case "updateQty": {
      const { quantity, sku } = action;
      if (quantity === 0) {
        return cart.filter((i) => i.sku !== sku);
      }
      return cart.map((i) =>
        i.sku === sku ? { ...i, quantity: quantity } : i
      );
    }

    default:
      throw new Error("Unhandled action " + action.type);
  }
}
