"use client";
import ToggleTheme from "../component/Toggle";
import Badge from "../component/ui/Badge";
import Button from "../component/ui/Button";
import Card from "../component/ui/Card";
import Input from "../component/ui/Input";
import { motion } from "framer-motion";

const boxVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1 },
};

const list = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Playground() {
  return (
    <div className="flex flex-col items-center gap-4 mt-40 min-h-screen">
      <ToggleTheme />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card
          title="Angle"
          description="A small piece of real angle"
          image="img1.jpg"
        />
      </motion.div>
      <motion.div
        variants={boxVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
        className="bg-purple-200 p-4 rounded"
      >
        Animated Box
      </motion.div>
      <Badge label="Name" />
      <Input type="text" placeHolder="enter your name" />
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        Motion Button
      </motion.button>
      <motion.ul
        variants={list}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        {[1, 2, 3].map((i) => (
          <motion.li
            key={i}
            variants={item}
            className="mb-4 bg-gray-100 p-4 rounded"
          >
            Item{i}
          </motion.li>
        ))}
      </motion.ul>
      <Button variant="primary" onclick={() => console.log("clicked")}>
        Add to basket
      </Button>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow rounded p-6"
      >
        <h3 className="text-lg font-bold mb-2">Scroll Reveal</h3>
        <p>This box fades in as you scroll to it.</p>
      </motion.div>
      <motion.div
        whileHover={{ rotate: -1.5, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white p-6 rounded shadow"
      >
        <h4 className="text-lg font-semibold">Interactive Card</h4>
        <p>Hover to tilt & scale</p>
      </motion.div>
    </div>
  );
}
