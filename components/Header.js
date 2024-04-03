import React from "react";
import Image from "next/image";
import imageAsset from "/img/logo.png";
import imageAssetRide from "/img/taxi.jpeg";
import imageAssetPackage from "/img/Box.jpeg";
import { UserButton } from "@clerk/nextjs";

function Header() {
  const headerMenu = [
    {
      id: 1,
      name: "Ride",
      icon: imageAssetRide,
    },
    {
      id: 2,
      name: "Package",
      icon: imageAssetPackage,
    },
  ];

  return (
    <div className="p-5 pb-3 pl-10 border-b-[4px] border-gray-200 flex items-center justify-between">
      <div className="flex gap-24 items-center">
        <Image src={imageAsset} width={70} height={70} alt="Logo" />
        <div className="flex gap-6 items-center">
          {headerMenu.map((item) => (
            <div className='flex gap-2 items-center' key={item.id}>
              <Image src={item.icon} width={17} height={17} />
              <h2 className="text-[14px] font-medium"> {item.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <UserButton/>
    </div>
  );
}

export default Header;
