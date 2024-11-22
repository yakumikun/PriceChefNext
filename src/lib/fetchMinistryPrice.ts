export const fetchMinistryPrice = async (): Promise<{ name: string; price: number }[]> => {
    try {
        const response = await fetch('/api/ministryPrice');
        if (!response.ok) {
            throw new Error('農水省の価格情報の取得に失敗しました。');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching Ministry Price:', error);
        throw error;
    }
};