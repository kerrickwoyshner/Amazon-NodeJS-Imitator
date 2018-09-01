# Bamazon-Node-App: Manager

A shopping support tool designed for managers to view products in low supply and add products to their inventory count.  This application is equipped with flexible databases in Sequel Pro/MySQL.

To begin:

1. Open up terminal/bash on your PC and navigate into the Bamazon-Node-App folder
2. Double-check that you're inside the Manager version of this application, then load the schema.sql file into your application so that      your database is set. On the MySQL Command-Line Interface (CLI), it's as easy as writing "mysql -u *username* -p *password*" and          writing "source schema.sql" (follow this video if you have any questions: https://www.youtube.com/watch?v=6HSVXJZk0aE).  If you're        using Sequel Pro and have any questions on getting your database populated, check out this video 
   (https://www.youtube.com/watch?v=GFBwvrVpCOI) that will walk you through the process of creating our data table on Sequel Pro.
3. Begin using the app by writing "node bamazonManager.js"
4. You will be prompted with the options to view products for sale, view low inventory, add to inventory, create a new product line, or quit the application
5. The app defines "low inventory" as any product holding five or less units in stock
6. Any additions to the inventory are reflected on the Sequel Pro or MySQL database. You can "thank the management" for this one.
  
  <img src="images/AddInventory.PNG" width="100%" height="100%">
  
7. Please let me know if you have any questions! I hope you enjoy using this app as much as I enjoyed publishing it.

~KHW
