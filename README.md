# Parrot Mate
This is a HackNYU project that was built from 2/15/19-2/17/19.  This is a clone of the original repo which is private because it contains a google API key.  The application features a chat board that displays text in a person's native language (among over 100 choices), an interactive quiz, and a question/answer forum.  The project was built using the Next.JS framework which packages Express and React into a single server with shared dependencies and runtime.  MongoDB was used as the backend.

$ Here is a demo of the site: https://parrotmate.com

$ Below is Devpost description: https://devpost.com/software/parrot-mate

# Inspiration
The coolest thing about hackathons is that it brings together so many unique individuals from all around the world. Through competition and fun, our differences broaden our understanding and appreciation for life. My friend Danny and I are really passionate about people and technology, so we thought it would be educational and empowering to create a platform that connected people from all around the world.

# What it does
Parrot Mate has two main functionalities. First, users can take quizzes with various degrees of difficulty to sharpen their skills in one of over 100 languages supported by the platform. The second functionality is that users are able to chat in a global chatroom with people from all across the world. The language is automatically detected and translated into the user's native language.

# How I built it
We used a full stack JavaScript approach by using the Next.JS Framework, ReactJS library, and MongoDB. The server is deployed on a Linux box running Apache and hosted with digital ocean. This application also relied on the Google API for translation. We have our own domain name! Check out at parrotmate.com

# Challenges I ran into
The google API limits how many requests occur, so we had to implement logic in order to limit those requests. Also, implementing chat was difficult because we could not just broadcast the message to all listeners with something like Socket.IO since we had to make sure that every listening individual had to have the message display in their native language. We ended up implementing a POST for incoming messages and a GET that is executed on an interval to get all messages in the native language of the requester.


# Accomplishments that I'm proud of
All the functionality took a lot of planning and hard work. We are proud that we deployed a chat server within a weekend and that we were able to implement so much functionality.



# Next.js + Express

## Build Setup

``` bash
# Dependencies
$ npm install

# Serve at at localhost:3000
$ npm run dev

# npm run build
$ npm start
