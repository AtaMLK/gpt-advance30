"use client";
import Card from "./component/Card";
import Counter from "./component/Counter";
import LoginFrom from "./component/LoginForm";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center my-5">
      Hello World!
      <Counter />
      <Card title="Neckless" price={220} image="/img1.jpg" />
      <Card title="Bracelet" price={320} image="/img2.jpg" />
      <LoginFrom />
    </div>
  );
}
