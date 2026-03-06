import { FinalContactForm } from "./components/FinalContactForm";

export default function FinalContactSection() {
  return (
    <section className="section final-contact-section">
      <div className="container final-contact-container">
        {/* Columna izquierda: Video */}
        <div className="final-contact-video-wrapper">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="final-contact-video"
          >
            <source src="/autos/black.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Columna derecha: Formulario */}
        <div className="final-contact-form">
          <h2 className="final-contact-title">Ponte en contacto</h2>
          <p className="final-contact-subtitle">
            Estamos para ayudarte a crecer
          </p>
          
          <FinalContactForm />
        </div>
      </div>
    </section>
  );
}
