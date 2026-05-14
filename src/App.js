import React from "react";
import {
  ShoppingCart,
  Trash2,
  Sparkles,
  PackageCheck,
} from "lucide-react";

export default function App() {

  const categories = {

    "Ceiling Section": {
      Expert: ["8ft", "10ft", "12ft"],
      "True Steel": ["8ft", "10ft", "12ft"],
      Golden: ["8ft", "10ft", "12ft"],
      Normal: ["8ft", "10ft", "12ft"],
    },

    Intermediate: {
      Expert: ["8ft", "10ft", "12ft"],
      "True Steel": ["8ft", "10ft", "12ft"],
      Golden: ["8ft", "10ft", "12ft"],
      Normal: ["8ft", "10ft", "12ft"],
    },

    Perimeter: {
      Expert: ["10ft", "12ft"],
      Golden: ["10ft", "12ft"],
    },

    "Gypsum Board": {
      Knauf: ["MR Board", "Standard Board"],
      USG: ["MR Board", "Standard Board"],
    },

  };

  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedBrand, setSelectedBrand] = React.useState("");
  const [selectedSize, setSelectedSize] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);

  const [customerName, setCustomerName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [vehicleNumber, setVehicleNumber] = React.useState("");

  const [cart, setCart] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);

  const brands =
    selectedCategory && categories[selectedCategory]
      ? Object.keys(categories[selectedCategory])
      : [];

  const sizes =
    selectedCategory &&
    selectedBrand &&
    categories[selectedCategory]?.[selectedBrand]
      ? categories[selectedCategory][selectedBrand]
      : [];

  const addToCart = () => {

    if (!selectedCategory || !selectedBrand || !selectedSize) {
      alert("Select all fields");
      return;
    }

    const item = {
      category: selectedCategory,
      brand: selectedBrand,
      size: selectedSize,
      quantity,
    };

    setCart([...cart, item]);

    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedSize("");
    setQuantity(1);
  };

  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const submitOrder = async () => {

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const orderData = {
    customerName,
    mobile,
    destination,
    vehicleNumber,
    items: cart,
    createdAt: new Date().toISOString(),
  };

  try {

    const response = await fetch("https://qadri-smart-billing-backend.onrender.com/orders", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(orderData),

    });

    const data = await response.json();

    console.log(data);

    alert("Order Submitted Successfully");

    setSubmitted(true);

    setCart([]);

  } catch (error) {

    console.log(error);

    alert("Backend Connection Failed");

  }

};

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* BACKGROUND GLOWS */}

      <div className="absolute top-0 left-0 w-72 md:w-96 h-72 md:h-96 bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute top-1/2 right-0 w-72 md:w-96 h-72 md:h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 left-1/3 w-72 md:w-96 h-72 md:h-96 bg-pink-500/20 blur-3xl rounded-full"></div>

      {/* MAIN */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 md:p-6">

        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[28px] md:rounded-[40px] p-4 md:p-8 shadow-2xl">

          {/* HEADER */}

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">

            <div className="text-center md:text-left">

              <h1 className="text-3xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Qadri Smart Billing Portal
              </h1>

              <p className="text-gray-300 mt-3 text-sm md:text-lg">
                Qadri Traders QR Ordering & Smart Billing System
              </p>

            </div>

            <div className="bg-green-500/20 border border-green-500/30 px-5 py-3 md:px-6 md:py-4 rounded-3xl">

              <p className="text-green-300 text-xs md:text-sm">
                SYSTEM STATUS
              </p>

              <div className="flex items-center justify-center gap-2 mt-2">

                <Sparkles className="text-green-400" size={18} />

                <p className="font-bold text-green-400 text-sm md:text-base">
                  ONLINE
                </p>

              </div>

            </div>

          </div>

          {/* CUSTOMER DETAILS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10">

            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="bg-slate-900/80 text-white border border-cyan-400/20 rounded-2xl md:rounded-3xl p-4 md:p-5 outline-none text-base md:text-lg"
            />

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="bg-slate-900/80 text-white border border-blue-400/20 rounded-2xl md:rounded-3xl p-4 md:p-5 outline-none text-base md:text-lg"
            />

            <input
              type="text"
              placeholder="Place of Supply"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-slate-900/80 text-white border border-purple-400/20 rounded-2xl md:rounded-3xl p-4 md:p-5 outline-none text-base md:text-lg"
            />

            <input
              type="text"
              placeholder="Vehicle Number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="bg-slate-900/80 text-white border border-pink-400/20 rounded-2xl md:rounded-3xl p-4 md:p-5 outline-none text-base md:text-lg"
            />

          </div>

          {/* PRODUCT SECTION */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 mb-8">

            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedBrand("");
                setSelectedSize("");
              }}
              className="bg-slate-900 text-white border border-cyan-400/20 rounded-2xl md:rounded-3xl p-4 md:p-5"
            >

              <option value="">Category</option>

              {Object.keys(categories).map((cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              ))}

            </select>

            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setSelectedSize("");
              }}
              className="bg-slate-900 text-white border border-cyan-400/20 rounded-2xl md:rounded-3xl p-4 md:p-5"
            >

              <option value="">Brand</option>

              {brands.map((brand) => (
                <option
                  key={brand}
                  value={brand}
                >
                  {brand}
                </option>
              ))}

            </select>

            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="bg-slate-900 text-white border border-cyan-400/20 rounded-2xl md:rounded-3xl p-4 md:p-5"
            >

              <option value="">Size / Type</option>

              {sizes.map((size) => (
                <option
                  key={size}
                  value={size}
                >
                  {size}
                </option>
              ))}

            </select>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="bg-slate-900 text-white border border-cyan-400/20 rounded-2xl md:rounded-3xl p-4 md:p-5"
            />

          </div>

          {/* BUTTON */}

          <button
            onClick={addToCart}
            className="w-full py-4 md:py-5 rounded-2xl md:rounded-3xl text-lg md:text-2xl font-black bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 flex justify-center items-center gap-3 shadow-[0_0_50px_rgba(59,130,246,0.4)]"
          >

            <ShoppingCart size={24} />

            Add Product

          </button>

          {/* CART */}

          <div className="mt-10 bg-white/5 border border-white/10 rounded-[28px] md:rounded-[40px] p-4 md:p-8">

            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">

              <div className="flex items-center gap-3">

                <PackageCheck size={28} />

                <h2 className="text-xl md:text-3xl font-black">
                  Order Cart
                </h2>

              </div>

              <div className="bg-cyan-500/20 px-4 py-2 rounded-2xl text-sm md:text-base">
                {cart.length} Items
              </div>

            </div>

            {cart.length === 0 ? (

              <div className="text-center py-16 md:py-20 text-gray-400 text-lg md:text-xl">
                🚀 No products added yet
              </div>

            ) : (

              <div className="space-y-5">

                {cart.map((item, index) => (

                  <div
                    key={index}
                    className="bg-white/10 border border-white/10 rounded-3xl p-4 md:p-6 flex flex-col md:flex-row justify-between md:items-center gap-4"
                  >

                    <div>

                      <h3 className="text-xl md:text-2xl font-bold">
                        {item.category}
                      </h3>

                      <p className="text-gray-300 mt-2 text-sm md:text-base">
                        {item.brand} • {item.size}
                      </p>

                    </div>

                    <div className="flex items-center justify-between md:justify-normal gap-5">

                      <div className="text-lg md:text-xl font-bold">
                        Qty: {item.quantity}
                      </div>

                      <button
                        onClick={() => removeItem(index)}
                        className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-3 md:px-5 md:py-3 rounded-2xl"
                      >

                        <Trash2 size={20} />

                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* SUBMIT */}

          <button
            onClick={submitOrder}
            className="mt-10 w-full py-5 md:py-6 rounded-2xl md:rounded-3xl text-xl md:text-3xl font-black bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600"
          >

            Submit Order

          </button>

          {/* SUCCESS */}

          {submitted && (

            <div className="mt-8 bg-green-500/20 border border-green-500/30 text-green-300 rounded-2xl md:rounded-3xl p-5 md:p-6 text-center text-lg md:text-2xl font-black">

              ✅ Order Submitted Successfully

            </div>

          )}

        </div>

      </div>

    </div>

  );
}