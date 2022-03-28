The content below is an example project proposal / requirements document. Replace the text below the lines marked "**TODO**" with details specific to your project. Remove the "TODO" lines.

# Timelinter

## Overview

Making schedules for small teams is really difficult if there are contstraints on how the schedules can be laid out.

If there is a maximum number of people that can be on shift at one time, or if there is a maximum number of hours on payroll, things get really complicated. Timelinter is an attempt to fix that. It is a schedule maker that will complain if constraints are violated.

It's essentially a linter for schedules. 

## Data Model

(**TODO**: a description of your application's data and their relationships to each other\_)

The application will store Users, Timelines, and People

-   users can have multiple timelines (by reference)
-   each timline can have multiple people (by reference)

(**TODO**: sample documents\_)

An Example User:

```javascript
{
  username: "shannonshopper",
  hash: // a password hash,
  timelines: // an array of references to Timeline documents
}
```

An Example Timeline:

```javascript
{
  user: // a reference to a User object
  name: "Tutoring",
  people: // an array of references to Person documents
}
```

An Example Person:
```javascript
{
  name: "Alyssa P. Hacker"
  timeline: // a reference to a Timeline
  availability: // array of available times
  chosen: // array of scheduled times
}
```

## [Link to Commented First Draft Schema](db.js)

(**TODO**: create a first draft of your Schemas in db.js and link to it\_)

## Wireframes

(**TODO**: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc.\_)

/timeline/create - page for creating a new timeline

/timeline - page for showing all timelines

/timeline/slug - page for showing specific timeline 

## Site map

(**TODO**: draw out a site map that shows how pages are related to each other\_)

## User Stories or Use Cases

(**TODO**: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47552679.1838903181.1489282706#previous)\_)

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new grocery list
4. as a user, I can view all of the grocery lists I've created in a single list
5. as a user, I can add items to an existing grocery list
6. as a user, I can cross off items in an existing grocery list

## Research Topics

-   (5 points) Integrate user authentication
    -   I'm going to be using passport for user authentication
    -   The [Google OAuth passport](https://github.com/jaredhanson/passport-google-oauth2) package will be used to hook into Google Calendar
    -   And account has been made for testing; I'll email you the password
-   (5 points)
    -   used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points 

## [Link to Initial Main Project File](app.js)

## Annotations / References Used

(**TODO**: list any tutorials/references/etc. that you've based your code off of\_)
