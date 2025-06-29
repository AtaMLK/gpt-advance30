"use client";
import Link from "next/link";
import Flex from "./component/Flex";

export default function Home() {
  return (
    <div className="w-full ">
      {/* <Counter />
      <Card title="Neckless" price={220} image="/img1.jpg" />
      <Card title="Bracelet" price={320} image="/img2.jpg" />
      <LoginFrom />
      <ShopPage />
      <CartPage />
      <StepCounter/> */}
      <Flex />
      <Link href={"/playground"}>Play Gournd</Link>
    </div>
  );
}

/*       <ReduxCounter />
 */
