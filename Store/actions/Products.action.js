import Product from "../../Models/Product";

export const DELETE_PROD = "DELETE_PROD"
export const CREATE_PRODUCT = "CREATE_PRODUCT"
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const SET_PRODUCT = "SET_PRODUCT"

//This function will fetch '
export const fetchProducts = () => {
    try {
        return async dispatch => {

            const response = await fetch('https://rn-shop-app-7fde4-default-rtdb.firebaseio.com/product.json')

            //check response status

            if(!response.ok){

                //we could also get the response message from the response body
                throw new Error("Something went wrong")

            }
            const resData = await response.json();

            //since we are working with array we will need to transform the data we get back to an array
            const loadedProducts = []
            for (const key in resData) {
                //this simply says for as number of key in the loadedProducts, loops through it and push the values
                loadedProducts.push(new Product(key, 'u1', resData[key].title, resData[key].imageUrl,
                    resData[key].description, resData[key].price))
            }


            dispatch({
                type: SET_PRODUCT,
                products: loadedProducts
            })
        }
    }catch (err) {
        throw err
    }

}

export const deleteProd = (prod_id) => {
    return async ()  =>{
     const response =  await fetch(`https://rn-shop-app-7fde4-default-rtdb.firebaseio.com/product/${prod_id}.json`, {
            method: 'DELETE',
        })
        if(!response.ok){
            throw new Error("Something went wrong")
        }
        dispatch( {
            type: DELETE_PROD,
            pid: prod_id
        })
    }


}


export const createProduct = (title, description, price, imageUrl) => {

    return async dispatch => {

     const response = await fetch('https://rn-shop-app-7fde4-default-rtdb.firebaseio.com/product.json', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                price,
                imageUrl
            })

        }).then((resData) => {
            if(!response.ok){
                throw new Error("Something went wrong")
            }
            dispatch({
                type: CREATE_PRODUCT,
                productData: {
                    id: resData.name,
                    title,
                    description,
                    price,
                    imageUrl
                }
            })
        })


    }
}

export const updateProduct = (id, title, description, imageUrl) => {
    return async dispatch => {

        const response = await fetch(
            `https://rn-shop-app-7fde4-default-rtdb.firebaseio.com//product/${id}.json`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl
                })
            }
        );
        console.log(response)
        if (!response.ok) {

            throw new Error('Something went wrong!');
        }

        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
                title,
                description,
                imageUrl
            }
        });
    };
}