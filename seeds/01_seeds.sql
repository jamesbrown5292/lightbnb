INSERT INTO users VALUES (1, 'James Brown', 'bassdata@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users VALUES (2, 'DeAngelo Vickers', 'juggles@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users VALUES (3, 'Michael Scarn', 'threatlevelmidnight@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users VALUES (4, 'Phyllis Vance', 'refrigerators@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties VALUES (1, 4, 'Refrigerator House', 'description', 'thumbnail', 'coverphoto', 120, 1, 2, 3, 'Canada', 'Fake Street', 'Vancouver', 'BC', 'H0H0H0', TRUE);
INSERT INTO properties VALUES (2, 3, 'Schrute Farms', 'description', 'thumbnail', 'coverphoto', 190, 4, 1, 5, 'Canada', 'Farm road', 'Whistler', 'BC', 'H1H1H1', TRUE);
INSERT INTO properties VALUES (3, 2, 'church house', 'description', 'thumbnail', 'coverphoto', 250, 2, 2, 2, 'Canada', 'Hidden drive', 'Kamloops', 'BC', 'H2H2H2', FALSE);
INSERT INTO properties VALUES (4, 1, 'The nook', 'description', 'thumbnail', 'coverphoto', 99, 0, 1, 1, 'Canada', 'Electric avenue', 'Squamish', 'BC', 'V2V2V2', TRUE);


INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES (1, 3, 3, 5, 'Nice stay'),
(2, 1, 2, 4, 'Fantastic'),
(2, 1, 3, 1, 'Awful');
