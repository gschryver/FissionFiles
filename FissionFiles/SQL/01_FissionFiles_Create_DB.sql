USE [master]

IF db_id('FissionFiles') IS NULL
  CREATE DATABASE [FissionFiles]
GO

USE [FissionFiles]
GO

DROP TABLE IF EXISTS [Users];
DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [Posts];
DROP TABLE IF EXISTS [Comments];
DROP TABLE IF EXISTS [Forums];
DROP TABLE IF EXISTS [TimelineEvent];
DROP TABLE IF EXISTS [Scientist];
DROP TABLE IF EXISTS [Article];
GO

CREATE TABLE [UserType] (
  [id] integer PRIMARY KEY IDENTITY,
  [name] varchar(255) NOT NULL
);

CREATE TABLE [Users] (
  [id] integer PRIMARY KEY IDENTITY,
  [firstName] varchar(255),
  [lastName] varchar(255),
  [displayName] varchar(255),
  [userTypeId] integer,
  [email] varchar(255),
  [creationDate] date,
  [avatar] varchar(255),
  [bio] varchar(255),
  [isActive] bit,

  CONSTRAINT [FK_Users_UserType] FOREIGN KEY ([userTypeId]) REFERENCES [UserType] ([id])
);

CREATE TABLE [Scientist] (
  [id] integer PRIMARY KEY IDENTITY,
  [fullName] varchar(255),
  [description] varchar(MAX),
  [imageUrl] varchar(255),
  [title] varchar(255),
  [achievements] varchar(MAX)
);

CREATE TABLE [Forums] (
  [id] integer PRIMARY KEY IDENTITY,
  [userId] integer,
  [moderatorId] integer,
  [name] varchar(255),
  [description] varchar(MAX),
  [isActive] bit,

  CONSTRAINT [FK_Forums_Users] FOREIGN KEY ([userId]) REFERENCES [Users] ([id]),
  CONSTRAINT [FK_Forums_Moderator] FOREIGN KEY ([moderatorId]) REFERENCES [Users] ([id])
);

CREATE TABLE [Posts] (
  [id] integer PRIMARY KEY IDENTITY,
  [userId] integer,
  [forumId] integer,
  [title] varchar(255),
  [timestamp] date,
  [content] varchar(MAX),
  [headerImage] varchar(255),
  [isDeleted] bit,

  CONSTRAINT [FK_Posts_Users] FOREIGN KEY ([userId]) REFERENCES [Users] ([id]),
  CONSTRAINT [FK_Posts_Forums] FOREIGN KEY ([forumId]) REFERENCES [Forums] ([id])
);

CREATE TABLE [Comments] (
  [id] integer PRIMARY KEY IDENTITY,
  [userId] integer,
  [postId] integer,
  [timestamp] date,
  [content] varchar(MAX),
  [isDeleted] bit,
  [isRemoved] bit,

  CONSTRAINT [FK_Comments_Users] FOREIGN KEY ([userId]) REFERENCES [Users] ([id]),
  CONSTRAINT [FK_Comments_Posts] FOREIGN KEY ([postId]) REFERENCES [Posts] ([id])
);

CREATE TABLE [TimelineEvent] (
  [id] integer PRIMARY KEY IDENTITY,
  [scientistId] integer,
  [eventName] varchar(255),
  [description] varchar(MAX),
  [date] date,

  CONSTRAINT [FK_TimelineEvent_Scientist] FOREIGN KEY ([scientistId]) REFERENCES [Scientist] ([id])
);

CREATE TABLE [Article] (
  [id] integer PRIMARY KEY IDENTITY,
  [userId] integer,
  [title] varchar(255),
  [content] varchar(MAX),
  [author] varchar(255),
  [publicationDate] date,

  CONSTRAINT [FK_Article_Users] FOREIGN KEY ([userId]) REFERENCES [Users] ([id])
);
GO
