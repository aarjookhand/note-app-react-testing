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


export const deleteNote = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/api/delete/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json();
    } catch (error) {
        throw error;
    }
};
