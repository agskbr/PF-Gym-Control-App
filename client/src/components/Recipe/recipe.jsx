import styles from './recipe.modules.css'

export default function Recipe() {
        return (
            <div className='recipe'>
                <img src='./img/gallery-7.jpg' className='recipe-img'></img>
                <div className='recipe-info'>
                    <p className='recipe-name'>Tortilla Española </p>
                    <p className='recipe-description'>La tortilla española es un plato tradicional de España. Es una tortilla hecha con huevos y patatas, incluyendo opcionalmente cebolla. Suele servirse a temperatura ambiente como tapa.</p>
                    <a href='#'>Conocer más</a>
                </div>
            </div>
        )
    }
