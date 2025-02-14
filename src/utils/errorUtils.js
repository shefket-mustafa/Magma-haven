export const getErrorMessage = (err) => {
    switch(err.name){
        case 'ValidationError':
            console.log(Object.values(err.errors).at(0));
            return Object.values(err.errors).at(0).message;
            default:
                return err.message;
    };
};