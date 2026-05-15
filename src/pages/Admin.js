import React from "react";
import {
  PackageCheck,
  Truck,
  Phone,
  User,
  MapPin,
  Clock3,
  RefreshCcw,
} from "lucide-react";

export default function Admin() {

  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchOrders = async () => {

    try {

      const response = await fetch(
        "https://qadri-smart-billing-backend.onrender.com/orders"
      );

      const data = await response.json();

      setOrders(data.reverse());

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  React.useEffect(() => {

    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden">

      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">

          <div>

            <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>

            <p className="text-gray-400 mt-2">
              Live Incoming Orders Monitor
            </p>

          </div>

          <button
            onClick={fetchOrders}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-4 rounded-2xl flex items-center gap-3 font-bold"
          >
            <RefreshCcw size={20} />
            Refresh Orders
          </button>

        </div>

        {loading ? (

          <div className="text-center text-2xl font-bold text-cyan-400 mt-32">
            Loading Orders...
          </div>

        ) : orders.length === 0 ? (

          <div className="text-center text-2xl font-bold text-red-400 mt-32">
            No Orders Yet
          </div>

        ) : (

          <div className="grid gap-8">

            {orders.map((order) => (

              <div
                key={order.id}
                className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[35px] p-8 shadow-2xl"
              >

                <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">

                  <div>

                    <div className="flex items-center gap-3 mb-3">
                      <PackageCheck className="text-cyan-400" />
                      <h2 className="text-3xl font-black text-cyan-300">
                        Order #{order.id}
                      </h2>
                    </div>

                    <div className="space-y-3 text-gray-300">

                      <div className="flex items-center gap-3">
                        <User size={18} />
                        <span>{order.customerName}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone size={18} />
                        <span>{order.mobile}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin size={18} />
                        <span>{order.destination}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Truck size={18} />
                        <span>{order.vehicleNumber}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock3 size={18} />
                        <span>
                          {new Date(order.createdAt).toLocaleString()}
                        </span>
                      </div>

                    </div>

                  </div>

                  <div className="flex flex-col gap-3">

  <div className="bg-green-500/20 border border-green-500/20 px-6 py-4 rounded-2xl h-fit">

    <p className="text-green-400 font-bold text-lg">
      {order.status}
    </p>

  </div>

  <button
    onClick={async () => {

      await fetch(
        `https://qadri-smart-billing-backend.onrender.com/orders/${order.id}`,
                {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Processing",
          }),
        }
      );

      fetchOrders();

    }}
    className="bg-yellow-500 text-black px-5 py-3 rounded-2xl font-bold"
  >
    Processing
  </button>

  <button
    onClick={async () => {
       await fetch(
        `https://qadri-smart-billing-backend.onrender.com/orders/${order.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Completed",
          }),
        }
      );

      fetchOrders();

    }}
    className="bg-green-500 text-black px-5 py-3 rounded-2xl font-bold"
  >
    Completed
  </button>

</div>

                </div>

                <div>

                  <h3 className="text-2xl font-black mb-5 text-purple-300">
                    Ordered Products
                  </h3>

                  <div className="grid md:grid-cols-2 gap-5">

                    {order.items.map((item, index) => (

                      <div
                        key={index}
                        className="bg-slate-900/70 border border-cyan-500/10 rounded-3xl p-5"
                      >

                        <div className="space-y-2">

                          <p>
                            <span className="text-gray-400">Category:</span>{" "}
                            {item.category}
                          </p>

                          <p>
                            <span className="text-gray-400">Brand:</span>{" "}
                            {item.brand}
                          </p>

                          <p>
                            <span className="text-gray-400">Size:</span>{" "}
                            {item.size}
                          </p>

                          <p>
                            <span className="text-gray-400">Quantity:</span>{" "}
                            {item.quantity}
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}