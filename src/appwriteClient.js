// src/appwriteClient.js
import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("687b684a0019ec8b1c7f");

const databases = new Databases(client);

export { databases };
