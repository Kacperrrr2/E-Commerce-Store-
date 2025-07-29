import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast"
export const useCartStore = create((set) => ({
    cart: [],
    coupon: null,
    total:0,
    subtotal:0,

    getCartItems: async () => {
        const res=await axios.get("/cart")
        try {
            const res=await axios.get("/cart")
            set({cart:res.data})

        } catch (error) {
            
        }
    }

    
}))