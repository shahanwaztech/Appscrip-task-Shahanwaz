'use client'
import React, {useState} from "react";

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

interface SideNavProps {
    categories: CategoryGroup[];
    onCategoryChange: (dropdownIndex: number, categoryId: number | null, isChecked: boolean) => void;
    onUnselectAll: (dropdownIndex: number) => void;
}

const SideNav: React.FC<SideNavProps> = ({categories, onCategoryChange, onUnselectAll}) => {
    const [dropdownStates, setDropdownStates] = useState<boolean[]>(categories.map(() => false));
    const [selectedCategories, setSelectedCategories] = useState<CategoryGroup[]>(categories);

    const toggleDropdown = (index: number) => {
        setDropdownStates(prevStates => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    const handleCheckboxChange = (dropdownIndex: number, categoryId: number, isChecked: boolean) => {
        setSelectedCategories(prevCategories => {
            const updatedCategories = [...prevCategories];
            updatedCategories[dropdownIndex].category = updatedCategories[dropdownIndex].category.map(category => {
                if (category.id === categoryId) {
                    return {...category, isChecked};
                }
                return {...category, isChecked: false};
            });
            return updatedCategories;
        });

        onCategoryChange(dropdownIndex, categoryId, isChecked);
    };

    const handleUnselectAll = (dropdownIndex: number) => {
        setSelectedCategories(prevCategories => {
            const updatedCategories = [...prevCategories];
            updatedCategories[dropdownIndex].category.forEach(category => {
                category.isChecked = false;
            });
            return updatedCategories;
        });

        onUnselectAll(dropdownIndex);
    };


    return (
        <div className="w-[300px] mt-[32px]">
            {selectedCategories.map((categoryGroup, index) => (
                <div key={index}>
                    <div className="flex flex-row justify-between items-start mt-[24px]">
                        <div className="flex flex-col gap-[8px]">
                            <h1 className="text-[18px] text-[#252020] font-bold uppercase">{categoryGroup.title}</h1>
                            <p>{categoryGroup.description}</p>
                        </div>
                        <div className="cursor-pointer h-[16px] w-[16px]" onClick={() => toggleDropdown(index)}>
                            <img src="/dropdown.svg" alt="dropdown button"
                                 className={`bg-cover w-[100%] h-[100%] ${dropdownStates[index] ? 'rotate-180 transform transition-transform delay-110' : ''}`}/>
                        </div>
                    </div>
                    {(dropdownStates[index] && categoryGroup.category.length > 0) && (
                        <>
                            <div className="mt-[24px] flex flex-col justify-start items-start gap-[24px]">
                                <button
                                    className="cursor-pointer underline text-[#BFC8CD] text-[16px]"
                                    onClick={() => handleUnselectAll(index)}>Unselect all
                                </button>
                                {categoryGroup.category.map(({id, label, isChecked}) => (
                                    <div key={id} className="flex flex-row gap-[10px] items-center">
                                        <input
                                            id={`checkbox_${id}`}
                                            type="checkbox"
                                            value=""
                                            name="bordered-checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                                            checked={isChecked}
                                            onChange={(e) => handleCheckboxChange(index, id, e.target.checked)}
                                        />
                                        <label
                                            htmlFor={`checkbox_${id}`}
                                            className={`text-[16px] text-[#252020] capitalize ${isChecked ? 'font-bold' : 'font-normal'}`}
                                        >
                                            {label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    <div className="bg-[#E5E5E5] h-[1px] mt-[24px]"/>
                </div>
            ))}
        </div>
    );
};

export default SideNav;

