USE [FissionFiles]
GO

INSERT INTO [UserType] ([name])
VALUES ('Admin'), ('User'), ('Moderator');

INSERT INTO [Users] ([firstName], [lastName], [displayName], [userTypeId], [email], [creationDate], [avatar], [bio], [isActive])
VALUES ('John', 'Doe', 'JohnD', 2, 'john.doe@example.com', GETDATE(), 'avatar1.jpg', 'Bio of John Doe', 1),
       ('Jane', 'Doe', 'JaneD', 3, 'jane.doe@example.com', GETDATE(), 'avatar2.jpg', 'Bio of Jane Doe', 1),
       ('Fission', 'Admin', 'FissionAdmin', 1, 'admin@admin.com', GETDATE(), 'avatar3.jpg', 'Bio of Fission Admin', 1);

INSERT INTO [Scientist] ([fullName], [description], [imageUrl], [title], [achievements])
VALUES ('Albert Einstein', 'A theoretical physicist', 'einstein.jpg', 'Physicist', 'Theory of Relativity'),
       ('Robert Oppenheimer', 'An American theoretical physicist', 'oppenheimer.jpg', 'Physicist', 'Manhattan Project'),
       ('Marie Curie', 'Physicist and Chemist', 'curie.jpg', 'Physicist', 'Pioneering research on radioactivity');

INSERT INTO [Forums] ([userId], [name], [description], [isActive])
VALUES (1, 'General Discussion', 'A forum for general discussion', 1),
       (2, 'Science Forum', 'A forum for science discussion', 1),
       (3, 'Admin Forum', 'A forum for admins', 1);

INSERT INTO [Posts] ([userId], [forumId], [title], [timestamp], [content], [headerImage], [isDeleted])
VALUES (1, 1, 'First post!', GETDATE(), 'This is the first post in the general discussion forum.', 'post1.jpg', 0),
       (2, 2, 'Science post!', GETDATE(), 'This is the first post in the science forum.', 'post2.jpg', 0),
       (3, 3, 'Admin post!', GETDATE(), 'This is the first post in the admin forum.', 'post3.jpg', 0);

INSERT INTO [Comments] ([userId], [postId], [timestamp], [content], [isDeleted], [isRemoved])
VALUES (2, 1, GETDATE(), 'Great post, John!', 0, 0),
       (1, 2, GETDATE(), 'Great post, Jane!', 0, 0),
       (1, 3, GETDATE(), 'Great post, Admin!', 0, 0);

INSERT INTO [TimelineEvent] ([scientistId], [eventName], [description], [date])
VALUES (1, 'Published Theory of Relativity', 'Einstein publishes his Theory of Relativity.', '1905-01-01'),
       (2, 'Started Manhattan Project', 'Oppenheimer started work on the Manhattan Project.', '1939-01-01'),
       (3, 'Discovered Radioactivity', 'Curie discovers radioactivity.', '1898-01-01');

INSERT INTO [Article] ([userId], [title], [content], [author], [publicationDate])
VALUES (1, 'Quantum Physics', 'Article content goes here.', 'John Doe', GETDATE()),
       (2, 'Biology Basics', 'Article content goes here.', 'Jane Doe', GETDATE()),
       (3, 'Admin Responsibilities', 'Article content goes here.', 'Admin', GETDATE());
GO
