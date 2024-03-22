'use client'
import Product_Card from "@/components/product_card";
import {useEffect, useState} from "react";
import ProductLayout from "@/components/layout/ProductLayout";

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

interface Product {
    id: number;
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

const Categories = [
    {
        title: 'Ideal for',
        description: 'All',
        category: [
            {
                id: 1,
                label: "men's clothing",
                isChecked: false,
            },
            {
                id: 2,
                label: "women's clothing",
                isChecked: false,
            },
            {
                id: 3,
                label: "electronics",
                isChecked: false,
            },
            {
                id: 4,
                label: 'jewelery',
                isChecked: false,
            }
        ]
    },
    {
        title: 'Occasion',
        description: 'All',
        category: []
    },
    {
        title: 'Work',
        description: 'All',
        category: []
    },
    {
        title: 'Fabric',
        description: 'All',
        category: []
    },
    {
        title: 'Segment',
        description: 'All',
        category: []
    },
    {
        title: 'Suitable for',
        description: 'All',
        category: []
    },
    {
        title: 'Raw Materials',
        description: 'All',
        category: []
    }
];

export default function Home() {
    const [selectedCategories, setSelectedCategories] = useState<CategoryGroup[]>(Categories);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>('recommended');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data: Product[] = await response.json();
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleCategoryChange = (dropdownIndex: number, categoryId: number | null, isChecked: boolean) => {
        setSelectedCategories(prevSelectedCategories => {
            const updatedCategories = [...prevSelectedCategories];
            if (categoryId !== null && updatedCategories[dropdownIndex].category[categoryId]) {
                updatedCategories[dropdownIndex].category[categoryId].isChecked = isChecked;
            }
            return updatedCategories;
        });
    };

    const handleUnselectAll = () => {
        setSelectedCategories(prevSelectedCategories => {
            return prevSelectedCategories.map(categoryGroup => ({
                ...categoryGroup,
                category: categoryGroup.category.map(category => ({
                    ...category,
                    isChecked: false
                }))
            }));
        });
    };


    useEffect(() => {
        const selectedLabels = selectedCategories.flatMap(group =>
            group.category.filter(category => category.isChecked).map(category => category.label)
        );

        if (selectedLabels.length > 0) {
            const filtered = filteredProducts.filter(product =>
                selectedLabels.includes(product.category)
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(filteredProducts);
        }
    }, [selectedCategories]);

    useEffect(() => {
        if (selectedOption === "recommended") {
            setFilteredProducts(filteredProducts);
        } else if (selectedOption === "rating: low to high") {
            setFilteredProducts(prevProducts => [...prevProducts].sort((a, b) => a.rating.rate - b.rating.rate));
        } else if (selectedOption === "rating: high to low") {
            setFilteredProducts(prevProducts => [...prevProducts].sort((a, b) => b.rating.rate - a.rating.rate));
        } else if (selectedOption === "price: low to high") {
            setFilteredProducts(prevProducts => [...prevProducts].sort((a, b) => a.price - b.price));
        } else if (selectedOption === "price: high to low") {
            setFilteredProducts(prevProducts => [...prevProducts].sort((a, b) => b.price - a.price));
        }
    }, [selectedOption]);


    return (
        <>
            <p className="text-[14px] font-light py-[10px] pl-[10px] lg:pl-[30px] ">
                <span className="text-[#BFC8CD]">HOME | </span>
                <span className="text-[#252020]">SHOP</span>
            </p>
            <div
                className="flex flex-col items-center pt-[10px] pb-[30px] px-[10px] md:pt-[30px] md:pb-[50px] justify-center">
                <h1 className="text-[#252020] lg:text-[60px] text-[24px] uppercase font-light text-center">DISCOVER OUR
                    PRODUCTS</h1>
                <p className="max-w-[750px] text-center text-[#252020] lg:text-[22px] text-[16px] font-light">Lorem
                    ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque. Dolor integer scelerisque
                    nibh amet mi ut elementum dolor.</p>
            </div>
            <div className="flex px-0 lg:px-[30px] gap-[10px] w-[100%] flex-row">
                <ProductLayout categories={Categories} selectedOption={selectedOption}
                               setSelectedOption={setSelectedOption}
                               onCategoryChange={handleCategoryChange} onUnselectAll={handleUnselectAll}>
                    <div className="flex flex-wrap gap-[10px] md:gap-[20px]  w-[100%] justify-center lg:justify-start">
                        {filteredProducts.map((i) => (
                            <Product_Card
                                key={i.id}
                                image={i.image}
                                price={i.price}
                                description={i.description}
                                title={i.title}
                                category={i.category}
                                rating={i.rating}
                            />
                        ))}
                    </div>
                </ProductLayout>
            </div>
        </>
    );
}
