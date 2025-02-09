import { useState } from 'react';

interface Result {
    place_id: string;
    name: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
}

interface Supermarket {
    supermarketId: string;
    name: string;
    distance: string;
    distanceValue: number;
    products: unknown[];
}

const useSupermarketSearch = () => {
    const [supermarkets, setSupermarkets] = useState<Supermarket[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchComplete, setSearchComplete] = useState(false);

    const searchSupermarkets = () => {
        setLoading(true);
        setError('');
        setSearchComplete(false);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    const url = `/api/searchSupermarkets?lat=${userLocation.lat}&lng=${userLocation.lng}`;

                    fetch(url)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then((data: { results: Result[] }) => {
                            if (data.results && data.results.length > 0) {
                                const destinationLocations = data.results
                                    .map((result) => `${result.geometry.location.lat},${result.geometry.location.lng}`)
                                    .join('|');

                                const distanceUrl = `/api/searchDistance?origins=${userLocation.lat},${userLocation.lng}&destinations=${destinationLocations}`;

                                fetch(distanceUrl)
                                    .then((response) => response.json())
                                    .then((distanceData: { rows: { elements: { distance: { text: string; value: number } }[] }[] }) => {
                                        const supermarkets = data.results.map((result, index) => ({
                                            supermarketId: result.place_id,
                                            name: result.name,
                                            distance: distanceData.rows[0].elements[index].distance.text,
                                            distanceValue: distanceData.rows[0].elements[index].distance.value,
                                            products: [],
                                        }));

                                        const uniqueSupermarkets = supermarkets.filter((supermarket, index, self) =>
                                            index === self.findIndex((t) => t.name === supermarket.name)
                                        );

                                        Promise.all(
                                            uniqueSupermarkets.map((supermarket) =>
                                                fetch(`/api/products?storeName=${encodeURIComponent(supermarket.name)}`)
                                                    .then((response) => response.json())
                                                    .then((data) => {
                                                        console.log('API Response:', data);
                                                        const updatedSupermarket = { ...supermarket, products: data };
                                                        return updatedSupermarket;
                                                    })
                                                    .catch((error) => {
                                                        console.error("Error fetching products:", error);
                                                        setError("商品の情報取得中にエラーが発生しました。");
                                                        return supermarket;
                                                    })
                                            )
                                        ).then((updatedSupermarkets) => {
                                            updatedSupermarkets.sort((a, b) => a.distanceValue - b.distanceValue);
                                            setSupermarkets(updatedSupermarkets);
                                        });
                                    })
                                    .catch((error) => {
                                        console.error("Error fetching distances:", error);
                                        setError("距離計算中にエラーが発生しました。");
                                    });
                            } else {
                                setError("周辺にスーパーマーケットが見つかりませんでした。");
                            }
                        })
                        .catch((error) => {
                            console.error("Error fetching supermarkets:", error);
                            setError("スーパーマーケットの取得中にエラーが発生しました。");
                        })
                        .finally(() => {
                            setLoading(false);
                            setSearchComplete(true);
                        });
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setError("位置情報の取得中にエラーが発生しました。");
                    setLoading(false);
                    setSearchComplete(true);
                }
            );
        } else {
            setError("このブラウザは位置情報サービスをサポートしていません。");
            setLoading(false);
            setSearchComplete(true);
        }
    };

    return { supermarkets, loading, error, searchComplete, searchSupermarkets };
};

export default useSupermarketSearch;