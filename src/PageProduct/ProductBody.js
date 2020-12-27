import React from 'react'
import ProductItem from './ProductItem'
export default function ProductBody({ infoproducts, clickdel, clickedit }) {
    //const [infoproducts, setInfoproducts] = useState([]);
    // const getData = () => {
    //     fetch('http://localhost:3000/producttest', {
    //         method: 'get', // or 'PUT'
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setInfoproducts(data);
    //             console.log('Success:', data);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }
    // //getDate();
    // useEffect(() => {
    //     getData();
    //     return () => setInfoproducts();
    // }, []);

    return (
        <div className="product__main__body">
            <div className="tag__name">
                <div className="tag__name__check">
                    <input type="checkbox" />
                </div>
                <div className="tag__name__name">
                    <span>Name</span>
                </div>
                <div className="tag__name__sku">
                    <span>SKU</span>
                </div>
                <div className="tag__name__price">
                    <span>Price</span>
                </div>
                <div className="tag__name__stock">
                    <span>Stock</span>
                </div>
                <div className="tag__name__branch">
                    <span>Branch</span>
                </div>
                <div className="tag__name__more">
                    <div className="btn__down__top">
                        <span className="material-icons">
                            more_horiz
                         </span>
                    </div>
                </div>
            </div>

            {infoproducts.map((product, index) => {
                return (
                    <ProductItem product={product} key={index} clickdel={() => clickdel(product)} clickedit={() => clickedit(product)} />

                )
            })}
            {/* <ProductItem />
            <ProductItem /> */}
        </div>
    )
}
