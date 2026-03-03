import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de Servicio",
  description: "Términos de servicio de Dr Polarizados",
};

export default function TerminosServicioPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <h1>Términos de Servicio</h1>
          <p className="lead" style={{ marginTop: "1rem" }}>
            Última actualización: Marzo 2024
          </p>

          <div style={{ marginTop: "2.5rem" }}>
            <h2 style={{ marginTop: "2rem" }}>1. Aceptación de Términos</h2>
            <p>
              Al acceder y utilizar el sitio web de <strong>Dr Polarizados</strong> (en adelante, "el Sitio"), ubicado en Buenos Aires, Argentina, aceptas estar sujeto a estos Términos de Servicio, así como a nuestra Política de Privacidad. Si no estás de acuerdo con estos términos, te solicitamos que no utilices el Sitio.
            </p>

            <h2 style={{ marginTop: "2rem" }}>2. Descripción de Servicios</h2>
            <p>
              Dr Polarizados ofrece:
            </p>
            <ul>
              <li>Información sobre láminas de polarizar para automotriz, arquitectura y aplicaciones especiales</li>
              <li>Consultoría sobre selección y características de productos</li>
              <li>Facilidades de contacto para solicitudes comerciales</li>
              <li>Acceso a catálogo de productos y especificaciones técnicas</li>
            </ul>
            <p>
              Nos reservamos el derecho de modificar, suspender o descontinuar cualquier aspecto del Sitio sin previo aviso.
            </p>

            <h2 style={{ marginTop: "2rem" }}>3. Licencia de Uso</h2>
            <p>
              Se te otorga una licencia limitada, no exclusiva y revocable para acceder y utilizar el Sitio únicamente con propósitos legales y conforme a estos Términos. No puedes reproducir, distribuir, transmitir, modificar, crear trabajos derivados o hacer uso comercial del contenido sin autorización previa.
            </p>

            <h2 style={{ marginTop: "2rem" }}>4. Propiedad Intelectual</h2>
            <p>
              Todo contenido del Sitio, incluyendo textos, imágenes, gráficos, logotipos y software, es propiedad de Dr Polarizados o de terceros que han otorgado autorización. Está protegido por las leyes de derechos de autor de la República Argentina e instrumentos internacionales.
            </p>
            <p>
              Se prohíbe la reproducción, distribución o transmisión del contenido sin consentimiento escrito previo.
            </p>

            <h2 style={{ marginTop: "2rem" }}>5. Restricciones de Uso</h2>
            <p>
              No debes:
            </p>
            <ul>
              <li>Acceder al Sitio de manera que interfiera con su funcionamiento</li>
              <li>Utilizar bots, scrapers u otros medios automatizados para descargar contenido</li>
              <li>Enviar virus, malware o código malicioso</li>
              <li>Intentar obtener acceso no autorizado a sistemas o datos</li>
              <li>Utilizar el Sitio para actividades ilícitas o fraudulentas</li>
              <li>Publicar contenido ofensivo, difamatorio, ilegal o que infrinja derechos de terceros</li>
              <li>Hacer spam o enviar comunicaciones no solicitadas masivas</li>
            </ul>

            <h2 style={{ marginTop: "2rem" }}>6. Precisión de Información</h2>
            <p>
              Aunque nos esforzamos por mantener información precisa y actualizada, no garantizamos la exactitud, integridad o disponibilidad de todo el contenido. El Sitio se proporciona "tal como está" sin garantías expresas o implícitas.
            </p>
            <p>
              Las especificaciones técnicas y precios pueden cambiar sin previo aviso. Te recomendamos confirmar detalle antes de realizar cualquier transacción comercial.
            </p>

            <h2 style={{ marginTop: "2rem" }}>7. Formularios de Contacto</h2>
            <p>
              Al enviar información a través de nuestros formularios:
            </p>
            <ul>
              <li>Certificas que proporcionas información veraz y completa</li>
              <li>Aceptas ser contactado por Dr Polarizados en los datos suministrados</li>
              <li>Autorizas el procesamiento de tus datos conforme a nuestra Política de Privacidad</li>
              <li>No utilizaremos tus datos para enviar spam o comunicaciones no solicitadas</li>
            </ul>

            <h2 style={{ marginTop: "2rem" }}>8. Enlaces Externos</h2>
            <p>
              El Sitio puede contener enlaces a sitios web de terceros. No somos responsables por:
            </p>
            <ul>
              <li>El contenido, precisión o confiabilidad de sitios externos</li>
              <li>Las prácticas de privacidad de terceros</li>
              <li>Daños o pérdidas resultantes del acceso a sitios externos</li>
            </ul>
            <p>
              Te recomendamos revisar los términos de servicio y políticas de privacidad de cualquier sitio externo que visites.
            </p>

            <h2 style={{ marginTop: "2rem" }}>9. Limitación de Responsabilidad</h2>
            <p>
              En la máxima medida permitida por la ley argentina, Dr Polarizados no será responsable por:
            </p>
            <ul>
              <li>Daños indirectos, incidentales, especiales o consecuentes</li>
              <li>Pérdida de datos, ingresos o beneficios</li>
              <li>Interrupciones del servicio o errores técnicos</li>
              <li>Daños causados por terceros o uso no autorizado</li>
            </ul>
            <p>
              La responsabilidad total de Dr Polarizados no excederá el monto de $10.000 ARS (pesos argentinos).
            </p>

            <h2 style={{ marginTop: "2rem" }}>10. Garantía Limitada</h2>
            <p>
              El Sitio se proporciona "tal como está" sin garantías de ningún tipo. Dr Polarizados no garantiza que:
            </p>
            <ul>
              <li>El Sitio esté libre de errores o interrupciones</li>
              <li>El acceso sea ininterrumpido o oportuno</li>
              <li>Los productos cumplan con requisitos específicos</li>
            </ul>
            <p>
              Para información sobre garantías de productos, contáctanos directamente.
            </p>

            <h2 style={{ marginTop: "2rem" }}>11. Indemnización</h2>
            <p>
              Aceptas indemnizar y eximir a Dr Polarizados de cualquier reclamo, daño, pérdida o gasto (incluyendo honorarios legales) originados por:
            </p>
            <ul>
              <li>Tu incumplimiento de estos Términos</li>
              <li>Tu uso del Sitio de manera contraria a la ley</li>
              <li>Violación de derechos de terceros</li>
            </ul>

            <h2 style={{ marginTop: "2rem" }}>12. Ley Aplicable y Jurisdicción</h2>
            <p>
              Estos Términos se rigen por las leyes de la República Argentina. Ambas partes se someten a la jurisdicción de los tribunales ordinarios competentes en Buenos Aires, Argentina.
            </p>
            <p>
              En caso de conflicto, las partes se comprometen a intentar resolver mediante negociación amistosa antes de recurrir a acciones legales.
            </p>

            <h2 style={{ marginTop: "2rem" }}>13. Resolución de Disputas</h2>
            <p>
              Antes de iniciar cualquier acción legal, te solicitamos que intentes resolver la disputa a través de negociación directa con nuestro equipo. Puedes contactarnos en:
            </p>
            <ul>
              <li>Email: <a href="mailto:comunicaciones@drpolarizados.com">comunicaciones@drpolarizados.com</a></li>
              <li>WhatsApp: +598 9 1168 477 185</li>
            </ul>

            <h2 style={{ marginTop: "2rem" }}>14. Divisibilidad</h2>
            <p>
              Si cualquier parte de estos Términos es considerada inválida o no exigible, dicha disposición será modificada al mínimo necesario para hacerla exigible, y el resto de Términos permanecerán en vigencia.
            </p>

            <h2 style={{ marginTop: "2rem" }}>15. Enmiendas</h2>
            <p>
              Dr Polarizados se reserva el derecho de modificar estos Términos en cualquier momento. Los cambios significativos serán notificados mediante:
            </p>
            <ul>
              <li>Aviso destacado en el Sitio</li>
              <li>Email a la dirección que proporcionaste</li>
              <li>Publicación en la página de Términos de Servicio</li>
            </ul>
            <p>
              Tu uso continuado del Sitio después de cambios constituye aceptación de los nuevos Términos.
            </p>

            <h2 style={{ marginTop: "2rem" }}>16. Política de Reembolso y Cancelación</h2>
            <p>
              Para consultas sobre políticas de reembolso o cancelación relacionadas con transacciones comerciales, por favor contacta directamente a nuestro equipo. Estas políticas pueden variar según el tipo de producto y servicio.
            </p>

            <h2 style={{ marginTop: "2rem" }}>17. Contacto</h2>
            <p>
              Para preguntas sobre estos Términos de Servicio:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:comunicaciones@drpolarizados.com">comunicaciones@drpolarizados.com</a></li>
              <li><strong>Teléfono:</strong> +598 9 1168 477 185</li>
              <li><strong>Ubicación:</strong> Buenos Aires, República Argentina</li>
            </ul>

            <h2 style={{ marginTop: "2rem" }}>18. Vigencia</h2>
            <p>
              Estos Términos de Servicio entraron en vigencia el 1° de marzo de 2024 y continuarán siendo válidos hasta que sean modificados o derogados por Dr Polarizados.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
