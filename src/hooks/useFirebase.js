import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import initApp from "../firebase/firebase.init";

initApp();

const useFirebase = () => {

    const [user, setUser] = useState({});
    const [admin, setAdmin] = useState(false);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const [loading, setLoading] = useState(true);

    const GoogleSingin = (history, location) => {

        setLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setUser(user);
                savedUser(user.email, user.displayName, 'PUT');

                const destination = location?.state?.from || '/';
                history.replace(destination);

            }).catch((error) => {
                console.log(error.message);
            })
            .finally(() => { setLoading(false); });

    };

    const SingupWithEmailAndPassword = (userName, email, password, history) => {

        createUserWithEmailAndPassword(auth, email, password)

            .then((result) => {

                const newUser = { email, displayName: userName };
                setUser(newUser);
                savedUser(email, userName, 'POST');
                updateProfile(auth.currentUser, {
                    displayName: userName
                }).then(() => {

                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            alert('user created');
                        });

                }).catch((error) => {
                    console.log(error.message);
                });

            })
            .catch((error) => {
                console.log(error.message);
            });

    };

    const SinginWithEmailAndPassword = (email, password, history, location) => {

        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setUser(result.user);
                const destination = location?.state?.from || '/';
                history.replace(destination);
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => { setLoading(false); });

    };

    useEffect(() => {

        fetch(`http://localhost:5000/users/${user?.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin));

    }, [user?.email]);

    const SingOut = () => {

        setLoading(true);
        signOut(auth).then(() => {
            setUser({});
        }).catch((error) => {
            console.log(error.message);
        })
            .finally(() => setLoading(false));
    };

    const savedUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('http://localhost:5000/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then();
    };

    useEffect(() => {

        const subscribed = onAuthStateChanged(auth, (user) => {

            if (user) {
                setUser(user);
            } else {
                setUser({});
            }
            setLoading(false);
        });

        return () => subscribed;

    }, []);

    return {
        user,
        admin,
        loading,
        GoogleSingin,
        SingupWithEmailAndPassword,
        SinginWithEmailAndPassword,
        SingOut
    };

};

export default useFirebase;