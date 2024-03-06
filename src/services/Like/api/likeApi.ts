import firestore from "@react-native-firebase/firestore";
import { Like } from "../models/likeModels";

async function getTotalCountLikesPost(postId: string): Promise<number> {
  const querySnapshot = await firestore()
    .collection("postLikes")
    .where("postId", "==", postId)
    .get();

  return querySnapshot.docs.length;
}

async function hasLikedPost({ postId, userId }: Like): Promise<boolean> {
  const querySnapshot = await firestore()
    .collection("postLikes")
    .where("postId", "==", postId)
    .where("userId", "==", userId)
    .get();

  return querySnapshot.docs.length > 0;
}

async function setLikePost({ postId, userId }: Like): Promise<void> {
  const querySnapshot = await firestore()
    .collection("postLikes")
    .where("postId", "==", postId)
    .where("userId", "==", userId)
    .get();

  if (querySnapshot.docs.length > 0) {
    const likeDocId = querySnapshot.docs[0].id;
    await firestore().collection("postLikes").doc(likeDocId).delete();
    console.log("Like removido com sucesso para o post", postId);
    return;
  }

  await firestore().collection("postLikes").add({
    postId: postId,
    userId: userId,
  });

  console.log("Like adicionado com sucesso para o post", postId);
}

export const likesApi = {
  getTotalCountLikesPost,
  hasLikedPost,
  setLikePost,
};
