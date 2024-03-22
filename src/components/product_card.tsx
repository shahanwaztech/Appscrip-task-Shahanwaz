'use client'
import React, {useState} from 'react';
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";

interface ProductPropsInterface {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

const Product_Card: React.FC<ProductPropsInterface> = ({title, price, description, category, image, rating}) => {
    const {user} = useAuth();
    const router = useRouter();
    const [isSelected, setIsSelected] = useState(false);
    const counting = Math.round(rating.rate);

    return (
        <div
            className="border border-[#E5E5E5] hover:shadow-md hover:scale-105 delay-110 transform transition-transform cursor-pointer rounded overflow-hidden p-[5px] md:p-[10px]">
            <div className="w-[155px] h-[189px] md:w-[270px] md:h-[329px] p-[20px]">
                <img src={image} alt={'Product-Image'}
                     className="w-[100%] h-[100%] bg-cover"/>
            </div>
            <div className="w-[155px] md:w-[270px]  mt-[24px] flex flex-col gap-[5px] md:gap-[10px] ">
                <div className="flex flex-row items-center justify-between">
                    <span
                        className="text-center py-[2px] capitalize font-bold rounded bg-gray-800 bg-opacity-10 w-[70px] md:w-[100px] text-[8px] md:text-[12px] text-[#252020]">{category}</span>
                    {isSelected ? <img onClick={() => setIsSelected(!isSelected)} src="/like.svg" alt="like"
                                       className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"/> :
                        <img onClick={() => setIsSelected(!isSelected)} src="/unlike.svg" alt={'unlike'}
                             className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"/>}
                </div>
                {user &&
                    <div className="flex flex-row justify-between items-center">
                        <span className="text-[#252020] text-[14px] md:text-[18px] font-bold">${price}</span>
                        <span className="flex flex-row gap-[2px]">
                    {[...Array(counting)].map((i) => (
                        <img key={i} src="/rating.webp" alt={'star'}
                             className="h-[10px] w-[10px] md:w-[14px] md:h-[14px]"/>
                    ))}
                </span>
                    </div>}
                <h1 className="text-[12px] md:text-[16px] line-clamp-1 font-bold uppercase">{title}</h1>
                {user &&
                    <p className="text-[8px] md:text-[12px] line-clamp-2 font-normal capitalize text-[#888792]">{description}</p>}
                <p className="text-[7px] md:text-[12px] text-[#888792] font-normal">
                    <span onClick={() => router.push('/login')} className="underline">Sign in</span>
                    {" "}or Create an account to see pricing
                </p>
            </div>
        </div>
    )
}

export default Product_Card;
