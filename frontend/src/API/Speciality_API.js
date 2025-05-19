import client from '../utils/client';

const get_All_Speciality = async () => {
    try {
        const res = await client.post('/special/get-speciality-list', {
            hidden_state: false,
        });
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Speciality_By_ID = async (id) => {
    try {
        const res = await client.get(`/special/get-speciality/${id}`);
        return res.data;
    } catch (error) {
        if (error.response) console.log('Error response: ', error.response.data.error);
        else console.log('Error not response: ', error.message);
        return null;
    }
};

const get_Top_Specialities = async () => {
    try {
        const res = await client.get('/special/get-doc-count');
        return res.data;
    } catch (error) {
        if (error.response) {
            console.log('Error response: ', error.response.data.error);
            return error.response.data.error;
        } 
        else {
            console.log('Error not response: ', error.message);
            return error.message;
        } 
    }
}; 


export default {
    get_All_Speciality,
    get_Speciality_By_ID,
    get_Top_Specialities,
};
