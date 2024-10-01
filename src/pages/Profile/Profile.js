import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "./Profile.module.scss";
import {updateUserProfile} from "../../features/user/userSlice";


const Profile = () => {
    const dispatch = useDispatch();

    const { user, loading, error } = useSelector((state) => state.user);

    const [editMode, setEditMode] = useState(false);
    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");

    useEffect(() => {
        if(user) {
            setFirstNameInput(user.firstName);
            setLastNameInput(user.lastName);
        }
    }, [user]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {
        dispatch(updateUserProfile({firstName: firstNameInput, lastName: lastNameInput}));
        setEditMode(false);
    }

    const handleCancelClick = () => {
        setFirstNameInput(user.firstName);
        setLastNameInput(user.lastName);
        setEditMode(false);
    }

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    return (
        <>
            <div className={styles.header}>
                {!editMode ? (
                    <>
                        <h1>
                            Welcome back
                            <br/>
                            Tony Jarvis!
                        </h1>
                        <button className={styles.editBtn} onClick={handleEditClick}>Edit Name</button>
                    </>
                ) : (
                    <>
                        <h1>Welcome back</h1>
                        <div className={styles.editForm}>
                            <div className={styles.editFormInputs}>
                            <input
                                type="text"
                                value={firstNameInput}
                                onChange={(e) => setFirstNameInput(e.target.value)}
                                placeholder="First Name"
                            />
                            <input
                                type="text"
                                value={lastNameInput}
                                onChange={(e) => setLastNameInput(e.target.value)}
                                placeholder="Last Name"
                            />
                            </div>
                            <div className={styles.editFormBtns}>
                                <button onClick={handleSaveClick}>
                                    Save
                                </button>
                                <button onClick={handleCancelClick}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className={styles.account}>
                <div className={styles.contentWrapper}>
                    <h3>Argent Bank Checking (x8349)</h3>
                    <p className={styles.amount}>$2,082.79</p>
                    <p className={styles.amountDesc}>Available Balance</p>
                </div>
                <div className={`${styles.contentWrapper} ${styles.cta}`}>
                    <button className={styles.transactionBtn}>View transactions</button>
                </div>
            </section>
            <section className={styles.account}>
                <div className={styles.contentWrapper}>
                    <h3>Argent Bank Savings (x6712)</h3>
                    <p className={styles.amount}>$10,928.42</p>
                    <p className={styles.amountDesc}>Available Balance</p>
                </div>
                <div className={`${styles.contentWrapper} ${styles.cta}`}>
                    <button className={styles.transactionBtn}>View transactions</button>
                </div>
            </section>
            <section className={styles.account}>
                <div className={styles.contentWrapper}>
                    <h3>Argent Bank Credit Card (x8349)</h3>
                    <p className={styles.amount}>$184.30</p>
                    <p className={styles.amountDesc}>Current Balance</p>
                </div>
                <div className={`${styles.contentWrapper} ${styles.cta}`}>
                    <button className={styles.transactionBtn}>View transactions</button>
                </div>
            </section>
        </>
    );
};

export default Profile;
