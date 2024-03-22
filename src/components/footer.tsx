import React from 'react';
import {useRouter} from "next/navigation";

const metausseObject = [
    {
        label: "About Us",
        href: "/"
    },
    {
        label: "Stories",
        href: "/"
    },
    {
        label: "Artisans",
        href: "/"
    },
    {
        label: "Boutiques",
        href: "/"
    },
    {
        label: "Contact Us",
        href: "/"
    },
    {
        label: "EU Compliances Docs",
        href: "/"
    }
]

const quicklinksObject = [
    {
        label: "Orders & Shipping",
        href: "/"
    },
    {
        label: "Join/Login as a Seller",
        href: "/"
    },
    {
        label: "Payment & Pricing",
        href: "/"
    },
    {
        label: "Return & Refunds",
        href: "/"
    },
    {
        label: "FAQs",
        href: "/"
    },
    {
        label: "Privacy Policy",
        href: "/"
    },
    {
        label: "Terms & Conditions",
        href: "/"
    }
]

const SocialLink = [
    {
        label: 'Instagram',
        imgSrc: '/Instagram.svg'
    },
    {
        label: 'Linkedein',
        imgSrc: '/Linkedin.svg'
    }
]

const PaymentObject = [
    {
        label: 'Gpay',
        imgSrc: '/Gpay.svg'
    },
    {
        label: 'MasterCard',
        imgSrc: '/MasterCard.svg'
    },
    {
        label: 'PayPal',
        imgSrc: 'PayPal.svg'
    },
    {
        label: 'Amex',
        imgSrc: 'Amex.svg'
    },
    {
        label: 'ApplePay',
        imgSrc: 'ApplePay.svg'
    },
    {
        label: 'Opay',
        imgSrc: 'Opay.svg'
    }
]

const Footer = () => {
    const router = useRouter()
    return (
        <div className="bg-[#000] mt-[30px] px-[30px] w-[100%]">
            <div className="w-[100%] pt-[50px] flex flex-col lg:flex-row items-start justify-between">
                <div className="w-[100%] lg:w-[55%]">
                    <h1 className="font-bold text-white uppercase text-[18px]">Be the first to know</h1>
                    <p className="font-light mt-[20px] text-white capitalize text-[16px]">Sign up for updates from mettā
                        muse.</p>
                    <div className="w-[100%] mt-[50px] flex flex-row gap-[20px]">
                        <input className="w-[60%] border border-[#1a1a1a] rounded  p-[10px]"
                               type="text" placeholder="Enter your e-mail"
                               required
                        />
                        <button
                            className="w-[30%] border border-[#fff] h-[45px] rounded text-white  uppercase">Subscribe
                        </button>
                    </div>
                </div>
                <div className="w-[100%] mt-[40px] lg:mt-0 lg:w-[45%] flex flex-col">
                    <h1 className="font-bold text-white uppercase text-[18px]">CONTACT US</h1>
                    <a href="tel:+442211335360" className=" mt-[10px] text-white text-[16px] font-light">+44 221 133
                        5360</a>
                    <a href="mailto:customercare@mettamuse.com"
                       className="mt-[10px] text-white text-[16px] font-light">customercare@mettamuse.com</a>
                    <h1 className="font-bold text-white uppercase text-[18px] mt-[40px]">Currency</h1>
                    <div className="flex flex-row gap-[5px] items-center mt-[10px] text-white">
                        <img src="/USA-Flag.svg" alt={'USA Flag'} className="w-[24px] h-[24px] bg-cover"/>
                        <div className="w-[5px] h-[5px] bg-white rotate-45"/>
                        <p className="flex font-bold text-white">USD</p>
                    </div>
                    <p className="text-white text-[12px] font-light mt-[10px]">Transactions will be completed in Euros
                        and a currency reference is available on hover.</p>
                </div>
            </div>
            <div className="w-[100%] bg-white h-[1px] rounded my-[30px]"/>
            <div className="w-[100%] flex flex-col lg:flex-row justify-between items-start">
                <div
                    className="flex w-[100%] md:w-[80%] lg:w-[45%] flex-col md:flex-row justify-start md:justify-between items-start">
                    <div>
                        <h1 className="font-bold text-white  text-[18px]">mettā muse</h1>
                        {metausseObject.map((link, index) => (
                            <div key={index} onClick={() => router.push(`${link.href}`)}
                                 className="cursor-pointer mt-[10px] text-white text-[16px] font-light">{link.label}</div>
                        ))}
                    </div>

                    <div className="mt-[40px] md:mt-0">
                        <h1 className="font-bold text-white uppercase text-[18px]">Quick Links</h1>
                        {quicklinksObject.map((link, index) => (
                            <div key={index} onClick={() => router.push(`${link.href}`)}
                                 className="cursor-pointer mt-[10px] text-white text-[16px] font-light">{link.label}</div>
                        ))}
                    </div>
                </div>
                <div className="w-[100%] mt-[40px] lg:mt-0 lg:w-[40%]">
                    <h1 className="font-bold text-white uppercase text-[18px]">Follow Us</h1>
                    <div className="flex flex-row gap-[20px] mt-[20px] items-center">
                        {SocialLink.map((i, index) => (
                            <span
                                key={index}
                                className="w-[32px] h-[32px] rounded-full cursor-pointer border border-white flex items-center justify-center">
                            <img src={i.imgSrc} alt={i.label} className="h-[18px] w-[18px]"/>
                        </span>
                        ))}
                    </div>
                    <h1 className="font-bold text-white uppercase mt-[40px] text-[18px]">mettā muse Accepts</h1>
                    <div className="flex flex-row gap-[10px] mt-[20px]">
                        {PaymentObject.map((i, index) => (
                            <img key={index} src={i.imgSrc} alt={i.label}
                                 className="cursor-pointer w-[36px] h-[25px] md:w-[56px] md:h-[35px]"/>
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-white text-center text-[12px] md:text-[14px] py-[30px] font-light">Copyright © 2023
                mettamuse. All
                rights reserved.</p>
        </div>
    )
}

export default Footer;
