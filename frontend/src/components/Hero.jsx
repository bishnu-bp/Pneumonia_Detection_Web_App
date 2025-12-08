import Doctor from "../Assets/xray.png";
import "../Styles/Hero.css";

function Hero() {
  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          <p className="text-headline">
            Your Health, Our Priority
          </p>
          <h2 className="text-title">
            Comprehensive Online Healthcare Services
          </h2>
          <p className="text-descritpion">
            Access top medical professionals from the comfort of your home. Get
            consultations, prescriptions, and health advice online.
          </p>
          <a href="#services" className="text-appointment-btn ">
            Online Predict
        </a>
            <div className="text-stats">
            <div className="text-stats-container">
              <p>0</p>
              <p>Receive Patients</p>
            </div>

            <div className="text-stats-container">
              <p>0.1</p>
              <p>Years of Experience</p>
            </div>
          </div>
        </div>

        <div className="hero-image-section">
          <img className="hero-image1" src={Doctor} alt="Doctor" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
