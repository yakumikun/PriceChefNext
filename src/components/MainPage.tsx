const MainPage = (): JSX.Element => {
    return (
        <div className="bg-gray-100">
            <div className="flex justify-center">
                <h1 className="text-orange-600 p-8 font-bold text-4xl border-b border-gray-700">PriceChefってなに？</h1>
            </div>
            <div className='grid grid-cols-3 gap-x-4 pt-8 mx-auto max-w-4xl'>
                <div className='p-6 shadow-xl rounded-3xl bg-white'>
                    <h3 className='text-2xl font-bold flex justify-center'>近くから探す</h3>
                    <p className='mt-4 text-lg'>あなたの現在地から、お買い得なスーパーをすぐに見つけられる！手間いらずで、すぐに買い物に出かけられる便利機能。お得な商品が待っているかも！</p>
                </div>

                <div className='p-6 shadow-xl rounded-3xl bg-white'>
                    <h3 className='text-2xl font-bold flex justify-center'>価格をシェア</h3>
                    <p className='mt-4 text-lg'>好きな商品の価格をサクッと登録！あなたの周辺のスーパーの価格を比べるための第一歩。あなたの手で、賢い買い物を始めましょう！</p>
                </div>

                <div className='p-6 shadow-xl rounded-3xl bg-white'>
                    <h3 className='text-2xl font-bold flex justify-center'>レシピから探す</h3>
                    <p className='mt-4 text-lg'>気になるレシピを選ぶだけ！そのレシピに必要な食材が一番安く揃えられるスーパーをサクッと表示。おいしい料理が手軽に、そしてお得に楽しめます！</p>
                </div>
            </div>
        </div>
    );
};

export default MainPage;