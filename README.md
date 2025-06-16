This is a static HTML version of  [monday.com/marketplace/](https://monday.com/marketplace/).

Here's a demo of the initial site:

<div>
    <a href="https://www.loom.com/share/ccd890f4965e4491b864a13988e35fe9">
      <p>static monday marketplace  🚀 - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/ccd890f4965e4491b864a13988e35fe9">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/ccd890f4965e4491b864a13988e35fe9-50df5b17b1e891ba-full-play.gif">
    </a>
  </div>

View the live site here: 

https://static-monday-marketplace.pages.dev/

It was initially built using 11ty and cursor in under an hour.

The  key features behind the site

- static html with almost no js
- load stupidly fast
- use responsive web design
- be seo optimised
- show what can be achieved in a very short period of time
- Transforming and hosting optimised images for all apps (images are cached for 1 week, so will only be fetched weekly - any chance to an image ca therefore be up to a week behind the proper marketplace)

**Update:** Reviews really slow down the site build, so uncomment the following at the top of `/_data/reviews.js` for quicker development:

```
//   return {};
```

This thing can be changed and updated, but for now it's provided as is.

This site is not affiliated with monday.com in any way. 

Please use [monday.com/marketplace/](https://monday.com/marketplace/) instead.

Testing github actions:

1. Install `act`
   ```
   brew install act
   ```
1. Basic usage:
   ```
   # Dry-run (lists workflows without executing)
   act -l

   # Run a specific workflow
   act -W .github/workflows/your_workflow.yml
   ```

Running a particular job:

```
act -j update-installs  --container-architecture linux/amd64 -W .github/workflows/historic_installs.yml
```