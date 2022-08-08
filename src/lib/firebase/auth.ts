import { currentUser } from "$lib/model/store";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

export function signIn() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)!;
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            currentUser.set(user);
            console.log(token, user);

            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}

function signOut() {
    auth.onAuthStateChanged((user) => {
        auth.signOut()
            .then(() => {
                console.log("ログアウトしました");
                location.reload();
            })
            .catch((error) => {
                console.log(`ログアウト時にエラーが発生しました (${error})`);
            });
    });
}

auth.onAuthStateChanged((user) => {
    if (user) {
        const signOutMessage = `
          <p>Hello, ${user.displayName}!<\/p>
          <button class="btn btn-primary" type="submit"  onClick="signOut()">サインアウト<\/button>
          `;
        // document.getElementById("auth").innerHTML = signOutMessage;
        console.log(signOutMessage);
    } else {
        const signInMessage = `
            <button class="btn btn-primary" type="submit"  onClick="signIn()">サインイン<\/button>
            `;
        console.log(signInMessage);

        // document.getElementById("auth").innerHTML = signInMessage;
    }
});
