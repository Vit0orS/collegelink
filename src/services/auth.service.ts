import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

async function createUserWithEmailAndPassword(
  name: string,
  email: string,
  password: string
): Promise<FirebaseAuthTypes.User> {
  const { user } = await auth().createUserWithEmailAndPassword(email, password);
  return user;
}

async function signInWithEmailAndPassword(
  email: string,
  password: string
): Promise<FirebaseAuthTypes.User> {
  const { user } = await auth().signInWithEmailAndPassword(email, password);

  return user;
}

async function signOut(): Promise<void> {
  await auth().signOut();
}

async function loadUserStorageData(
  setUser: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.User>>
): Promise<void> {
  await auth().onAuthStateChanged(setUser);
}

async function changeUserPassword(
  email: string,
  oldPassword: string,
  newPassword: string,
  user: FirebaseAuthTypes.User
): Promise<void> {
  const credential = auth.EmailAuthProvider.credential(email, oldPassword);
  await user.reauthenticateWithCredential(credential);

  await user.updatePassword(newPassword);
}

async function forgotUserPassword(email: string): Promise<void> {
  await auth().sendPasswordResetEmail(email);
}

export const authApi = {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  loadUserStorageData,
  changeUserPassword,
  forgotUserPassword,
};
