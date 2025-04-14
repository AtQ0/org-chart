import Modal from "@/components/Modal/Modal";
import "./globals.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="flex flex-col justify-center items-center h-screen bg-[url('/images/clouds.png')] bg-cover bg-center lg:bg-[url('/images/clouds.png')]">
        <div className="h-[100%] flex flex-col gap-10 pt-10">
          <Image
            src="/images/main-logo.png"
            alt="My image"
            width={400}
            height={400}
            className="object-cover rounded-xl"
          />
          <Modal
            headerTitle="Sign in to Org-Chart"
            inputFields={["Username", "Password"]}
          />
        </div>
      </section>
    </>
  );
}
