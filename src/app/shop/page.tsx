"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../component/ui/Card";
import Drawer from "../component/ui/Drawer";
import Modal from "../component/ui/Modal";

interface Product {
  title: string;
  image: string;
  description: string;
}

const productBox = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemBox = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};
const products = [
  {
    id: 1,
    title: "earings",
    image: "/img5.jpg",
    description: " The item is good",
  },
  {
    id: 2,
    title: "ring",
    image: "/img3.jpg",
    description: " The item is nice",
  },
  {
    id: 3,
    title: "neckless",
    image: "/img4.jpg",
    description: " The item is tight ",
  },
];
export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full relative"
      >
        <button
          className="absolute top-5 left-5 cursor-pointer text-5xl"
          onClick={() => setIsOpen(true)}
        >
          X
        </button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="text-3xl font-bold uppercase space-x-1">menu</div>
          <div>nenu</div>
          <div>senu</div>
        </Drawer>
        <img
          src="./Hero-img1.jpg"
          alt="1"
          className="w-full h-80 object-cover object-center shoadow"
        />
      </motion.div>
      <motion.div
        className="px-10 py-5 mb-100"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-bold text-3xl"> Shop </h1>
        <p className="font-normal text-lg py-3"> All the categories</p>
      </motion.div>
      <motion.ul
        variants={productBox}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        className="flex gap-4 "
      >
        P{" "}
        {products.map((item) => (
          <motion.li
            variants={itemBox}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            key={item.id}
            className="cursor-pointer"
          >
            <button onClick={() => setSelectedProduct(item)}>
              <Card {...item} />
            </button>
          </motion.li>
        ))}
      </motion.ul>
      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && <Card {...selectedProduct} />}
      </Modal>
    </div>
  );
}
