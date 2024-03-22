'use client'
import React, {useEffect, useState} from "react";
import SideNav from "@/utils/sidenav";

interface Option {
    label: string;
}

interface Category {
    id: number;
    label: string;
    isChecked: boolean;
}

interface CategoryGroup {
    title: string;
    description: string;
    category: Category[];
}

const options: Option[] = [
    {label: "recommended"},
    {label: "price: high to low"},
    {label: "price: low to high"},
    {label: "rating: high to low"},
    {label: "rating: low to high"},
];

interface Layout {
    categories: CategoryGroup[];
    children: React.ReactNode;
    selectedOption: string;
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
    onCategoryChange: (dropdownIndex: number, categoryId: number | null, isChecked: boolean) => void;
    onUnselectAll: (dropdownIndex: number) => void;
}

const ProductLayout: React.FC<Layout> = ({categories, onUnselectAll, onCategoryChange, children, selectedOption, setSelectedOption}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isSideNavOpen, setIsSideNavOpen] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth >= 1100);
        };
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSelectOption = (option: string) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };

    return (
        <>
            {isMobile ? (
                <div className="flex flex-col w-[100%] h-[100%]">
                    <div
                        className="border-b border-t border-[#E5E5E5] h-[41px] lg:h-[61px] flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-[40px] items-center h-[100%]">
                            <span className="uppercase text-[18px] font-bold text-[#252020]">3425 items</span>
                            <button onClick={() => setIsSideNavOpen(!isSideNavOpen)}
                                    className="flex flex-row gap-[5px] uppercase items-center">
                                <img src="/dropdown.svg" alt={'arrow-button'}
                                     className={`transform transition-transform delay-110  ${isSideNavOpen ? 'rotate-90' : '-rotate-90'} h-[16px] w-[16px]`}/>
                                <span
                                    className="text-[#888792] underline text-[16px]">{isSideNavOpen ? 'Hide Filter' : 'Show Filter'}</span>
                            </button>
                        </div>
                        <div className="relative">
                            <div
                                className="font-bold relative text-[18px] cursor-pointer text-[#252020] flex flex-row gap-[5px] items-center"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <span className="uppercase">{selectedOption && selectedOption}</span>
                                <img src="/dropdown.svg" alt={'img'}
                                     className={`w-[16px] h-[16px] ${isDropdownOpen ? 'rotate-180' : 'rotate-0'} transform transition-transform delay-110`}/>
                            </div>
                            {isDropdownOpen && (
                                <ul className="absolute rounded-md top-10 right-1 z-20 bg-white shadow-md w-[220px]">
                                    {options.map((option: Option, index: number) => (
                                        <li
                                            key={index}
                                            className={`uppercase flex flex-row gap-[5px] items-center justify-end text-[16px] px-[10px] py-[10px] cursor-pointer ${selectedOption === option.label ? "font-bold" : "font-normal"}`}
                                            onClick={() => handleSelectOption(option.label)}
                                        >
                                            {selectedOption === option.label &&
                                                <img src="/selectedIcon.svg" alt={'tick'}
                                                     className="h-[16px] w-[16px]"/>}
                                            {option.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row h-[100%] gap-[15px] mt-[24px]">
                        <div
                            className={`w-[300px] transform transition-transform ease-in-out duration-300  flex flex-col ${
                                isSideNavOpen ? 'block' : ' hidden'
                            }`}>
                            <SideNav categories={categories} onCategoryChange={onCategoryChange}
                                     onUnselectAll={onUnselectAll}/>
                        </div>
                        <div>{children}</div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col w-[100%] h-[100%]">
                    <div
                        className="border-b border-t px-[10px] border-[#E5E5E5] h-[41px] lg:h-[61px] flex flex-row justify-between items-center">
                        <div className="h-[100%] flex items-center">
                            <button onClick={() => setIsOpen(true)}
                                    className="flex flex-row gap-[3px] uppercase items-center">
                                <img src="/dropdown.svg" alt={'arrow-button'}
                                     className={`transform transition-transform delay-110  ${isOpen ? 'rotate-90' : '-rotate-90'} h-[16px] w-[16px]`}/>
                                <span
                                    className="text-[#888792] underline text-[16px]">{isOpen ? 'Hide Filter' : 'Show Filter'}</span>
                            </button>
                        </div>
                        <div className="h-[70%] w-[1px] bg-[#E5E5E5]"/>
                        <div className="relative">
                            <div
                                className="font-bold relative text-[14px] text-[#252020] flex flex-row gap-[5px] items-center"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <span className="uppercase">{selectedOption && selectedOption}</span>
                                <img src="/dropdown.svg" alt={'img'}
                                     className={`w-[16px] h-[16px] ${isDropdownOpen ? 'rotate-180' : 'rotate-0'} transform transition-transform delay-110`}/>
                            </div>
                            {isDropdownOpen && (
                                <ul className="absolute top-10 right-1 z-20 bg-white shadow-md w-[200px]">
                                    {options.map((option: Option, index: number) => (
                                        <li
                                            key={index}
                                            className={`uppercase flex flex-row gap-[5px] items-center justify-end text-[14px] px-[10px] py-[10px] cursor-pointer ${selectedOption === option.label ? "font-bold" : "font-normal"}`}
                                            onClick={() => handleSelectOption(option.label)}
                                        >
                                            {selectedOption === option.label &&
                                                <img src="/selectedIcon.svg" alt={'tick'}
                                                     className="h-[14px] w-[14px]"/>}
                                            {option.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="flex relative flex-row h-[100%] mt-[24px]">
                        <div
                            className={`fixed  inset-0 z-[22] top-0 left-0 h-full w-[100%] md:w-[250px] bg-[#E5E6FF] transform transition-transform ease-in-out duration-300 ${
                                isOpen ? 'translate-x-0' : '-translate-x-full'
                            }`}
                        >
                            <SideNav categories={categories} onCategoryChange={onCategoryChange}
                                     onUnselectAll={onUnselectAll}/>
                            <div
                                onClick={() => setIsOpen(false)}
                                className={`absolute top-[20px] bg-black text-white w-[30px] h-[30px] rounded-full flex items-center justify-center shadow-md cursor-pointer right-[20px] ${
                                    isOpen ? 'block' : 'hidden'
                                }`}
                            >
                                X
                            </div>
                        </div>
                        <div>{children}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductLayout;
