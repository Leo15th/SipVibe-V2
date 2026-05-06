import Button from "../components/Button";

export default function Cart({ cart, updateQuantity, removeItem, imageMap, onCheckout }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className="pt-32 px-4 md:px-10 lg:px-20">
        {cart.length === 0 ? (
          // ✅ Empty cart message
          <div className="text-center text-white font-bold text-2xl py-20">
            Your cart is empty. Start adding some delicious drinks!
          </div>
        ) : (
          <ul className="space-y-4">
            {cart.map(item => {
              // ✅ Define imgKey inside the loop
              const imgKey = item.title.toLowerCase().replace(/\s+/g, "-");

              return (
                <li
                  key={item.id}
                  className="flex flex-col md:flex-row bg-slate-400 justify-between items-center px-5 py-4 rounded-lg gap-4"
                >
                  {/* Product info */}
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <img
                      src={imageMap[imgKey] || "/assets/placeholder.png"} // ✅ use imageMap safely
                      alt={item.title}
                      className="w-20 h-20 rounded-lg object-cover object-center"
                    />
                    <div className="flex flex-col">
                      <span className="font-extrabold text-xl md:text-2xl">{item.title}</span>
                      <span className="font-bold text-lg md:text-xl">$ {item.price}</span>
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-4 font-bold text-lg md:text-2xl">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>

                  {/* Item total */}
                  <div className="font-extrabold text-lg md:text-2xl">
                    $ {(item.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm md:text-base bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Footer with totals */}
      {cart.length > 0 && (
        <footer>
          <div className="bg-gray-800 fixed bottom-0 left-0 right-0 flex flex-col md:flex-row gap-4 items-center justify-between p-5">
            <div className="flex flex-col md:flex-row gap-4 text-white font-bold text-lg md:text-xl">
              <div className="flex justify-between border px-2 py-1 gap-7 w-full md:w-auto">
                <h3>Total</h3>
                <span className="text-right">$ {subtotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout button shows total items */}
            <div className="text-white">
              <Button 
                btnName={`Check Out (${cart.reduce((sum, item) => sum + item.quantity, 0)})`} 
                onClickListener={onCheckout}
              />
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
