INSERT INTO account (
    account_firstname,
    account_lastname,
    account_email,
    account_password
  )
VALUES (
    'Tony',
    'Stark',
    'tony@starkent.com',
    'Iam1ronM@n'
  );

UPDATE account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony';

DELETE FROM account
WHERE account_firstname = 'Tony';

UPDATE inventory
SET inv_description = 'Do you have 6 kids and like to go offroading? The Hummer gives you a huge interiors with an engine to get you out of any muddy or rocky situation.'
WHERE inv_make = 'GM' and inv_model = 'Hummer';

SELECT inventory.inv_make, inventory.inv_model, classification.classification_name
FROM inventory
INNER JOIN classification
ON inventory.classification_id = classification.classification_id
WHERE classification.classification_name = 'Sport';

UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/')
WHERE inv_image LIKE '%/images/%' AND inv_thumbnail LIKE '%/images/%';
