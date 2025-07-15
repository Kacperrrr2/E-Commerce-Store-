import express from "express"
import {getCartProducts,toggleFeaturedProduct,getProductsByCategory,getRecomendedProducts ,deleteProduct,getAllProducts,getFeaturedProducts, createProduct } from "../controllers/product.controller.js"
import { protectRoute , adminRoute} from "../middleware/auth.middleware.js"

const router =express.Router()

router.get("/",protectRoute, adminRoute, getCartProducts)
router.get("/featured",getFeaturedProducts)
router.get("/recommendations",getRecomendedProducts)
router.get("/category/:category",getProductsByCategory)
router.post("/", protectRoute, adminRoute, createProduct)
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct)
router.delete("/:id", protectRoute, adminRoute, deleteProduct)
export default router