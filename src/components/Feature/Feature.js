import styles from "./Feature.module.scss";

const Feature = ({ title, description, image, altImage }) => (
        <div className={styles.feature}>
            <img src={image} alt={altImage} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );

export default Feature;