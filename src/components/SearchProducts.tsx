const SearchProducts = (): JSX.Element => {
    return (
            <div className="h-full">
                <div className="flex flex-col items-center justify-center gap-2">
                    <h1 className="text-xl font-bold mt-4">近くのプライスを探す</h1>
                    <input type="search" placeholder="店舗名・商品名" className="border border-black px-9 py-3" />
                </div>
            </div>
    );
}

export default SearchProducts;