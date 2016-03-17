Lab 5 - Passport Authentication

In this lab you will add a new data-driven page to your in-class MEAN application and control access to your new page.  Make sure your application is running using mLab for your database.

- In routes/users.js, link to your existing Account model
- In routes/users.js, modify the route handler for GET requests at /users so that it queries your database using your Account model and fetches a list of all users.  Also make this route private so only authenticated users can access it
- Modify views/users.js to include your header and footer and display the user _ids and usernames in an HTML grid (the hashed passwords and salt values should NOT be displayed)

To submit, commit to GitHub and publish to Azure, Heroku, or another cloud service.  Post the links to both your GitHub repo and your live site.
