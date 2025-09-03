import { account } from "~/appwrite/client";
import { OAuthProvider } from "appwrite";

export const loginWithGoogle = () => {
    try{
        account.createOAuth2Session(OAuthProvider.Google)
    } catch (e) {
        console.log(e);
    }
}

export const logoutUser = () => {
    try{

    } catch (e) {
        console.log(e);
    }
}

export const getUser = () => {
    try{

    } catch (e) {
        console.log(e);
    }
}

export const getGooglePicture = () => {
    try{

    } catch (e) {
        console.log(e);
    }
}

export const storeUserData = () => {
    try{

    } catch (e) {
        console.log(e);
    }
}

export const getExistingUser = () => {
    try{

    } catch (e) {
        console.log(e);
    }
}