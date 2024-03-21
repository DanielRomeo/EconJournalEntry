# CHATTER

- This project is a social platform, it aims to be the heaven for the tiktok, hastag, reels tiype of audiences. It is a multi functional platform for authors and readers to create and access content. Chatter seeks to knock off competetion from Hashnode and Medium in tis first two years of launch.

- This application makes use of a frontend library called NextJs for better routing and navigation.

### User registration and authentication:
- Chatter makes use of google registration and authentication using the firebase api. Users can signin and can also signout using google popup or the forms themselves. The forms have validation. So you cannot just login or signup without inserting any data. The `{auth}` variable is used here.
- The firebase settings are stored in the `_components/firebaseConfig.ts` page.

### Content creation:
- In the `/createpost` page, users are allowed to create and publish content using a text editor that is also validated. Users can submit post thumbnails and post post contents using Markdown. The contents can also be displayed on the page as they write the markdown.

### Content discovery:
- A feed for the user is made available on the `/feed` page. The feed gets the posts from the Firebase database and displays them on the page.

### Best practices:
- This application makes uses of proper linting practices such as using `prettier` and `eslint` for proper linting.
- Typescript & ReactJs were used in this project and neccessary SEO practices were made such as 
  1. Adding descriptions for images and alt tags.
  2. Adding descriptions and title for the various pages.
- Firebase was used to store the data. Firebase was used to store and retrieve data to and from the React project.
  
### Form validations:
- All forms are validated, and errors and provided where neccessary. In the `_components/dismissableAlert.tsx` an alert component is created so as to show errors and success messages for different operations.


### Folders structure:
- This is a NEXTJS project. all files are under `src/app`. 
- Each folder represents a page and page name. E.G `>feed/page.tsx` is the feed page.
- The home page is under `src/app/page.tsx`
- Major components are under `_components/` 
- The styles for the components are under `_components/_styles/`
- The project makes use of SCSS, Therefore styles are saved as type: `[filename].module.scss` and are imported in the respective pages as: `import Styles from '[file to path]'`

#### How to start the app:
1. Run `yarn run install`
2. Run `yarn run build`
3. Run `yarn run start`