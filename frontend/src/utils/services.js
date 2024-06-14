export const viewList = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/read');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json();
    } catch (error) {
        throw error;
    }
};