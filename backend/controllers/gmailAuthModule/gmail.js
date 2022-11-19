const fs = require('fs').promises;
const mongoose = require('mongoose')
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const gAuth = require('./gmailAuthModel')
const User = require('../../models/userModel')

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist(user_id) {
  try {
    //TODO: change to read token from database
    // const content = await fs.readFile(TOKEN_PATH);
    // const credentials = JSON.parse(content);
    console.log(user_id)
    const currUser = await User.findById(user_id)
    const credentials = currUser.gmailAuth
    console.log('credentials: ', credentials)
    console.log('credentials exists in mongodb')
    return google.auth.fromJSON(credentials);
  } catch (err) {
    console.log(err)
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const keys = await gAuth.findOne()
  // const content = await fs.readFile(CREDENTIALS_PATH);
  // const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  // await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize(user_id) {

  let client = await loadSavedCredentialsIfExist(user_id);
  if (client) {
    // console.log('client exists: ', client)
    return client;
  }
  const keys = await gAuth.findOne()
  await fs.writeFile(CREDENTIALS_PATH, JSON.stringify(keys)); // disable nodemon to use
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listLabels(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  const res = await gmail.users.labels.list({
    userId: 'me',
  });
  const labels = res.data.labels;
  if (!labels || labels.length === 0) {
    console.log('No labels found.');
    return;
  }
  console.log('Labels:');
  labels.forEach((label) => {
    console.log(`- ${label.name}`);
  });
}

async function listMsgs(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  const res = await gmail.users.messages.list({
    userId: 'me',
  });

  console.log(res.data)
  const messages = res.data.messages;
  if (!messages || messages.length === 0) {
    console.log('No messages found.');
    return;
  }
  console.log('Message found');
  let retrievedMsgs = []
  for (let i = 0; i < messages.length; i++) {
    const msgObj = {}
    const res = await gmail.users.messages.get({
      userId: 'me',
      id: messages[i].id
      // format: 'raw'
    });
        // console.log(res.data)
    
        let buff = new Buffer.from(res.data.payload.parts[0].body.data, 'base64');
        let text = buff.toString('utf-8');
        // console.log(text)
        res.data.payload.headers.forEach((header) => {
          if (header.name == 'From'){
            // console.log(header)
            msgObj.from = header.value
          }
          if (header.name == 'To'){
            // console.log(header)
            msgObj.to = header.value
          }
          if (header.name == 'Subject'){
            // console.log(header)
            msgObj.subject = header.value
          }
        })
        msgObj.snippet = res.data.snippet
        msgObj.emailTime = res.data.internalDate
        msgObj.gmail_id = messages[i].id
        retrievedMsgs.push(msgObj)

        // const simpleParser = require('mailparser').simpleParser;
        // let parsed = await simpleParser(res.data.raw);
        // console.log(parsed)
    // res.data.payload.headers.forEach((header) => {
      // if (body.value == 'Google Community Team <googlecommunityteam-noreply@google.com>'){
        // console.log(header)
      // }
    // })
    // console.log(`- ${res.data.payload.headers[22]}`);
    // console.log(res.data.payload.headers);
  }
  return retrievedMsgs
  
  // const res1 = await gmail.users.messages.get({
  //   userId: 'me',
  //   id: '18463522b52badc0'
  // });
  // console.log(res1.data.payload.headers[22])
  // messages.forEach(async (message) => {
  //   const res = await gmail.users.messages.list({
  //     userId: 'me',
  //     id: message.id
  //   });
  //   console.log(`- ${res.payload}`);
  // });
}


// authorize().then(listLabels).catch(console.error);

module.exports = {
  authorize,
  listLabels,
  listMsgs,
  CREDENTIALS_PATH
};
