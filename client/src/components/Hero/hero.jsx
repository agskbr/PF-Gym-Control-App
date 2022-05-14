import './style.css'

export default function Hero() {
    return (
        <section className="section-hero">
                <div className="hero-main">
                    <div className="hero-text-box">
                        <div className="heading-primary-container">
                            <h1 className="heading-primary">El gimnasio que siempre has querido</h1>
                        </div>
                        <p className="hero-description">Si pensabas que el gimnasio perfecto no existía, estabas equivocado. Encuentra decenas de clases, planes de dieta y precios bajos con nosotros.</p>
                        <a href="/login" className="btn-main">Empezar</a>
                    </div>
                    <div className="hero-login">
                        <p className="login-text">¿Ya eres miembro? <a href="/login" className="login-link">Entra a tu cuenta</a></p>
                    </div>
                </div>
        </section> 
    )
}