import styles from "./Home.module.scss";
import Feature from "../../components/Feature";
import ChatIcon from "../../assets/img/icon-chat.png";
import MoneyIcon from "../../assets/img/icon-money.png";
import SecurityIcon from "../../assets/img/icon-security.png";

const features = [
    {
        title: "You are our #1 priority",
        description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
        image: ChatIcon,
        altImage: "Chat icon"
    },
    {
        title: "More savings means higher rates",
        description: "The more you save with us, the higher your interest rate will be!",
        image: MoneyIcon,
        altImage: "Money icon"
    },
    {
        title: "Security you can trust",
        description: "We use top of the line encryption to make sure your data and money is always safe.",
        image: SecurityIcon,
        altImage: "Security icon"
    }
];

const Home = () => {
    return (
        <>
            <div className={styles.hero}>
                <section>
                    <h2 className="sr-only">Promoted Content</h2>
                    <p className={styles.subtitles}>No fees.</p>
                    <p className={styles.subtitles}>No minimum deposit.</p>
                    <p className={styles.subtitles}>High interest rates.</p>
                    <p className={styles.text}>Open a savings account with Argent Bank today!</p>
                </section>
            </div>
            <section className={styles.features}>
                <h2 className="sr-only">Features</h2>
                {features.map((feature, index) => (
                    <Feature
                        key={index}
                        title={feature.title}
                        description={feature.description}
                        image={feature.image}
                        altImage={feature.altImage}
                    />
                ))}
            </section>
        </>
    );
}

export default Home;
