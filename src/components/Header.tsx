"use client";

import React, { useState } from 'react';
import ShoppingListSidebar from './ShoppingListSidebar';
import Link from "next/link";
import Image from "next/image";

const Header = (): JSX.Element => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    return (
        <header className="bg-orange-600 text-white font-bold flex justify-between items-center p-4">
            <div>
                <Link href="/tech">
                    <h1 className="text-4xl my-">PriceChef</h1>
                </Link>
            </div>

            <nav>
                <ul className="flex space-x-8 items-center">
                    <li className="font-bold hover:text-green-400">
                        <Link href="/tech">ホーム</Link>
                    </li>
                    <li className="font-bold hover:text-green-400">
                        <Link href="/RegisterPrices">価格をシェア</Link>
                    </li>
                    <li className="font-bold hover:text-green-400">
                        <Link href="/SearchRecipe">レシピを探す</Link>
                    </li>
                    <li>
                        <div className=''>
                            <button onClick={() => setSidebarVisible(prev => !prev)}>
                                <Image
                                    src="/shoppingList.svg"
                                    alt="お買い物リスト"
                                    width={40}
                                    height={40}
                                    className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
                                />
                            </button>
                        </div>
                    </li>
                </ul>
            </nav>
            <ShoppingListSidebar
                isVisible={isSidebarVisible}
                closeSidebar={() => setSidebarVisible(false)}
            />
        </header>
    );
}

export default Header;