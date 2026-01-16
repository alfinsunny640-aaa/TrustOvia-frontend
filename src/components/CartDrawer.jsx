import Cart from "../pages/Cart";

function CartDrawer({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <>
            {/* BACKDROP */}
            <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />

            {/* CART PANEL */}
            <div
                className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-xl"
                onClick={(e) => e.stopPropagation()} // ✅ IMPORTANT
            >
                {/* HEADER */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">CART</h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-xl cursor-pointer hover:opacity-70"
                        aria-label="Close cart"
                    >
                        ✕
                    </button>
                </div>

                {/* CART CONTENT */}
                <div className="h-[calc(100%-64px)] overflow-y-auto">
                    <Cart />
                </div>
            </div>
        </>
    );
}

export default CartDrawer;
