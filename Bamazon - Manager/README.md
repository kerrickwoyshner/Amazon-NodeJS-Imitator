Bamazon-Node-App
A take on the classic bargain-hunter using the command line in Node.js and databases in Sequel Pro/MySQL.

To begin:

1. Open up terminal/bash on your PC and navigate into the Bamazon-Node-App folder
2. Open either MySQL or Sequel Pro and connect using the localhost framework discussed in the bamazon.sql file
3. Type "mysql.server start" (Sequel Pro) or mysql -u ____ -p _____ with username and password information (MySQL) to ensure you are connected to mysql. To create the database, type in "source schema.sql" in your MySQL Command-Line Interface
4. Begin using the app by writing "node bamazonManager.js"
You will be prompted with the options to view products for sale, view low inventory, add to inventory, create a new product line, or quit the application
The app defines "low inventory" as any product holding five or less units in stock
Any changes to the inventory are reflected on the Sequel Pro or MySQL database
You can "thank the management" for this one.
Please let me know if you have any questions! I hope you enjoy using this app as much as I enjoy publishing it :)
~KHW
