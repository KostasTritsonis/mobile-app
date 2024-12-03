import { Account,Avatars,Client,Databases,ID, Query } from 'react-native-appwrite';

export const config={
    endpoint:"https://cloud.appwrite.io/v1",
    platform:"com.kt.aora",
    projectId:"6712a9e3001a46cb4ebc",
    databaseId:"6713cb0e001d74121af7",
    userCollectionId:"6713cb3700232eab6784",
    videoCollectionId:"6713cb68003d3d32859d",
    storageId:"6713cd630000eee87362"
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email,password,username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )        

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);
        await signIn(email,password);
        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar:avatarUrl

            }); 
            return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
    
}

export const signIn = async (email,password) => {
    try {
        const session = await account.createEmailPasswordSession(email,password);
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
      const currentAccount = await account.get();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        config.databaseId,
        config.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
    }
  }

 export const getAllPosts = async()=>{
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
 }

 export const getLatestPosts = async()=>{
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt',Query.limit(7))]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
 }
