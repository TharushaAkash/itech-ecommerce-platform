import { LiaBusAltSolid } from "react-icons/lia";


export function getCart(){
    const cartString = localStorage.getItem("cart");
    if(cartString == null){
        localStorage.setItem("cart", "[]");
        return [];
    }else{
        const cart = JSON.parse(cartString);
        return cart
    }
}

export function addToCart(product, quantity){
    const cart = getCart();
    const existingProductIndex = cart.findIndex(
        (item) => {
            return item.productId === product.productId || (item.product && item.product.productId === product.productId)
        }
    ) // -1 if not found
    if(existingProductIndex == -1){
        if(quantity > 0){
            cart.push(
                {
                    productId: product.productId,
                    product: {
                        productId: product.productId,
                        name: product.name,
                        image: product.image ? product.image : (product.images && product.images.length > 0 ? product.images[0] : null),
                        labeledPrice: product.labeledPrice,
                        price: product.price,
                    },
                    quantity: quantity
                }
            )
        }
    }else{
        const newQty = cart[existingProductIndex].quantity + quantity;

        if(newQty > 0){
            cart[existingProductIndex].quantity = newQty;
        }else{
            cart.splice(existingProductIndex, 1);
        }
    }

    const cartString = JSON.stringify(cart);
    localStorage.setItem("cart", cartString);
}

export function getTotal(cart){
    let total = 0;

    for(let i = 0; i < cart.length; i++){
        total += cart[i].product.price * cart[i].quantity;
    }
    return total;
}