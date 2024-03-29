﻿USE [master]

IF db_id('FissionFiles') IS NULL
  CREATE DATABASE [FissionFiles]
GO

USE [FissionFiles]
GO

DROP TABLE IF EXISTS [PostTags];
DROP TABLE IF EXISTS [Article];
DROP TABLE IF EXISTS [Tag];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [Comments];
DROP TABLE IF EXISTS [Posts];
DROP TABLE IF EXISTS [Forums];
DROP TABLE IF EXISTS [Users];
DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [TimelineEvent];
DROP TABLE IF EXISTS [Scientist];

GO

CREATE TABLE [UserType] (
  [id] integer PRIMARY KEY IDENTITY,
  [name] varchar(255) NOT NULL
);

CREATE TABLE [Users] (
  [id] integer PRIMARY KEY IDENTITY,
  [firstName] varchar(50) NOT NULL,
  [lastName] varchar(50) NOT NULL,
  [displayName] varchar(50) NOT NULL,
  [userTypeId] integer NOT NULL,
  [email] varchar(355) NOT NULL,
  [creationDate] datetime NOT NULL,
  [avatar] nvarchar(255) DEFAULT('default.jpg'),
  [bio] varchar(555) NULL,
  [isActive] bit NOT NULL DEFAULT(1),

  CONSTRAINT [FK_Users_UserType] FOREIGN KEY ([userTypeId]) REFERENCES [UserType] ([id])
);

CREATE TABLE [Scientist] (
  [id] integer PRIMARY KEY IDENTITY,
  [fullName] varchar(255) NOT NULL,
  [description] varchar(MAX) NOT NULL,
  [imageUrl] varchar(255) NOT NULL,
  [title] varchar(255) NOT NULL,
  [achievements] varchar(MAX) NOT NULL
);

CREATE TABLE [Forums] (
  [id] integer PRIMARY KEY IDENTITY,
  [userId] integer NOT NULL,
  [name] varchar(255) NOT NULL,
  [description] varchar(MAX) NOT NULL,
  [isActive] bit NOT NULL,

  CONSTRAINT [FK_Forums_Users] FOREIGN KEY ([userId]) REFERENCES [Users] ([id])
);

CREATE TABLE [Posts] (
  [id] integer PRIMARY KEY IDENTITY,
  [userId] integer NOT NULL,
  [forumId] integer NOT NULL,
  [tagId] integer NULL,
  [title] varchar(255) NOT NULL,
  [timestamp] datetime NOT NULL,
  [content] varchar(MAX) NOT NULL,
  [headerImage] varchar(255) NOT NULL,
  [isDeleted] bit NOT NULL DEFAULT(0),

  CONSTRAINT [FK_Posts_Users] FOREIGN KEY ([userId]) REFERENCES [Users] ([id]),
  CONSTRAINT [FK_Posts_Forums] FOREIGN KEY ([forumId]) REFERENCES [Forums] ([id])
);

CREATE TABLE [Comments] (
  [id] integer PRIMARY KEY IDENTITY,
  [userId] integer NOT NULL,
  [postId] integer NOT NULL,
  [timestamp] datetime NOT NULL,
  [content] varchar(MAX) NOT NULL,
  [isDeleted] bit NOT NULL DEFAULT(0),
  [isRemoved] bit NOT NULL DEFAULT(0),

  CONSTRAINT [FK_Comments_Users] FOREIGN KEY ([userId]) REFERENCES [Users] ([id]),
  CONSTRAINT [FK_Comments_Posts] FOREIGN KEY ([postId]) REFERENCES [Posts] ([id])
);

CREATE TABLE [Category] (
    [id] integer PRIMARY KEY IDENTITY,
    [name] varchar(255) NOT NULL,
    [description] varchar(555) NULL
);

CREATE TABLE [TimelineEvent] (
  [id] integer PRIMARY KEY IDENTITY,
  [scientistId] integer NOT NULL,
  [eventName] varchar(255) NOT NULL,
  [description] varchar(MAX) NOT NULL,
  [date] datetime,

  CONSTRAINT [FK_TimelineEvent_Scientist] FOREIGN KEY ([scientistId]) REFERENCES [Scientist] ([id])
);

CREATE TABLE [Tag] (
    [id] integer PRIMARY KEY IDENTITY,
    [name] varchar(255) NOT NULL,
    [description] varchar(555) NULL
);

CREATE TABLE [PostTags] (
    [postId] integer NOT NULL,
    [tagId] integer NOT NULL,

    CONSTRAINT [PK_PostTags] PRIMARY KEY ([postId], [tagId]),
    CONSTRAINT [FK_PostTags_Posts] FOREIGN KEY ([postId]) REFERENCES [Posts] ([id]),
    CONSTRAINT [FK_PostTags_Tags] FOREIGN KEY ([tagId]) REFERENCES [Tag] ([id])
);

CREATE TABLE [Article] (
  [id] integer PRIMARY KEY IDENTITY,
  [userId] integer NOT NULL,
  [categoryId] integer NULL,
  [title] varchar(255) NOT NULL,
  [content] varchar(MAX) NOT NULL,
  [author] varchar(255) NOT NULL,
  [publicationDate] datetime  NOT NULL,
  [imageUrl] varchar(255) NOT NULL,

  CONSTRAINT [FK_Article_Users] FOREIGN KEY ([userId]) REFERENCES [Users] ([id]),
  CONSTRAINT [FK_Article_Category] FOREIGN KEY ([categoryId]) REFERENCES [Category] ([id])
);
GO